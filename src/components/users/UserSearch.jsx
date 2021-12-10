import {useState, useContext} from 'react'
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';

function UserSearch() {
    const [text, setText] = useState('');
    const {users, searchUsers, clearUsers} = useContext(GithubContext);
    const {setAlert} = useContext(AlertContext);


    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleClear = e => {
        e.preventDefault();
        clearUsers();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(text === ''){
            setAlert('Search field can not be blank', 'error');
        }else{
            searchUsers(text);
            setText('');
        }
    }

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 lg:-grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input 
                                type="text" 
                                value={text}
                                onChange={handleTextChange}
                                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                                placeholder="Search"/>
                            <button type="submit" className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">Go</button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                {users.length > 0 && (
                    <button className="btn btn-ghost btn-lg" onClick={handleClear}>Clear</button>
                )}
            </div>
        </div>
    )
}

export default UserSearch
