import {FaHome} from 'react-icons/fa'
import {Link} from 'react-router-dom';

function NotFound() {
    return (
        <div className='hero'>
            <div className="text-center hero-content">
                <div className="max-w-lg">
                    <h1 className="text-5xl font-bold mb-8">
                        404 - Page Not Found!
                    </h1>
                    
                    <Link to='/' className="btn btn-primary btn-lg">
                        <FaHome className='mr-2'/>
                        Take me home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound
