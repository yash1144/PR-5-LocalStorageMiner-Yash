import { useEffect, useState } from "react";
import View from "./View";

function Form() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        address: "",
        city: "",
    });
    const [list, setList] = useState([]);
    const [hobby, setHobby] = useState([]);
    const [error, setError] = useState({});
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const oldList = JSON.parse(localStorage.getItem("list")) || [];
        setList(oldList);
    }, []);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "hobby") {
            let newHobby = [...hobby];
            if (checked) {
                newHobby.push(value);
            } else {
                newHobby = newHobby.filter((h) => h !== value);
            }
            setHobby(newHobby);
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validation()) return;

        let newList;
        if (editId === null) {
            newList = [...list, { ...user, id: Date.now(), hobby }];
        } else {
            newList = list.map((item) =>
                item.id === editId ? { ...user, id: editId, hobby } : item
            );
            setEditId(null);
        }

        localStorage.setItem("list", JSON.stringify(newList));
        setList(newList);

        setUser({
            username: "",
            email: "",
            password: "",
            phone: "",
            gender: "",
            address: "",
            city: "",
        });
        setHobby([]);
        setError({});
    };

    const validation = () => {
        const tempError = {};
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!user.username) tempError.username = "Username is required";
        if (!user.email) tempError.email = "Email is required";
        if (!user.password) tempError.password = "Password is required";
        if (user.password && !passwordPattern.test(user.password))
            tempError.password =
                "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.";
        if (!user.phone) tempError.phone = "Phone is required";
        if (!user.gender) tempError.gender = "Gender is required";
        if (!hobby.length) tempError.hobby = "At least one hobby is required";
        if (!user.address) tempError.address = "Address is required";
        if (!user.city) tempError.city = "City is required";

        setError(tempError);
        return Object.keys(tempError).length === 0;
    };

    const handleDelete = (id) => {
        const newList = list.filter((user) => user.id !== id);
        localStorage.setItem("list", JSON.stringify(newList));
        setList(newList);
        alert("User data deleted.");
    };

    const handleEdit = (id) => {
        const userToEdit = list.find((user) => user.id === id);
        setUser(userToEdit);
        setHobby(userToEdit.hobby || []);
        setEditId(id);
    };

    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2 className="form-header">Sign Up</h2>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                    />
                    {error.username && <div className="error">{error.username}</div>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    {error.email && <div className="error">{error.email}</div>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    {error.password && <div className="error">{error.password}</div>}
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                    />
                    {error.phone && <div className="error">{error.phone}</div>}
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={user.gender === "male"}
                        onChange={handleChange}
                    />
                    Male
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={user.gender === "female"}
                        onChange={handleChange}
                    />
                    Female
                    {error.gender && <div className="error">{error.gender}</div>}
                </div>

                <div className="form-group">
                    <label>Hobbies</label>
                    <input
                        type="checkbox"
                        name="hobby"
                        value="reading"
                        checked={hobby.includes("reading")}
                        onChange={handleChange}
                    />
                    Reading
                    <input
                        type="checkbox"
                        name="hobby"
                        value="traveling"
                        checked={hobby.includes("traveling")}
                        onChange={handleChange}
                    />
                    Traveling
                    <input
                        type="checkbox"
                        name="hobby"
                        value="gaming"
                        checked={hobby.includes("gaming")}
                        onChange={handleChange}
                    />
                    Gaming
                    {error.hobby && <div className="error">{error.hobby}</div>}
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <textarea
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                    />
                    {error.address && <div className="error">{error.address}</div>}
                </div>

                <div className="form-group">
                    <label>City</label>
                    <select name="city" value={user.city} onChange={handleChange}>
                        <option value="">-- Select City --</option>
                        <option value="New York">New York</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Chicago">Chicago</option>
                        <option value="Houston">Houston</option>
                        <option value="Phoenix">Phoenix</option>
                    </select>
                    {error.city && <div className="error">{error.city}</div>}
                </div>

                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </form>

            <View list={list} handleDelete={handleDelete} handleEdit={handleEdit} />
        </>
    );
}

export default Form;
