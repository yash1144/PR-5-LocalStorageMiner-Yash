import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";


function View({ list = [], handleDelete, handleEdit }) {
    return (
        <table className="table">
            <caption>
                <h2>User Data</h2>
            </caption>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Hobby</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {list && list.length > 0 ? (
                    list.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.phone}</td>
                            <td>{user.gender}</td>
                            <td>{user.hobby?.join(", ")}</td>
                            <td>{user.address}</td>
                            <td>{user.city}</td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                                    <MdDeleteForever />
                                </button>
                                <button className="edit-btn" onClick={() => handleEdit(user.id)}>
                                    <CiEdit />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="10" className="no-data">
                            No Data Found
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default View;
