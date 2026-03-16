const { useState, useEffect } = React;

const mockData = {
    users: [
        { id: 1, name: 'Admin User', email: 'admin@elearning.com', password: 'admin123', role: 'admin' },
        { id: 2, name: 'John Instructor', email: 'instructor@elearning.com', password: 'inst123', role: 'instructor' },
        { id: 3, name: 'Jane Student', email: 'student@elearning.com', password: 'stud123', role: 'student' }
    ],
    courses: [
        { id: 1, title: 'Web Development', instructor: 'John Instructor', students: 45, status: 'active' },
        { id: 2, title: 'Data Science', instructor: 'John Instructor', students: 32, status: 'active' },
        { id: 3, title: 'Mobile Development', instructor: 'John Instructor', students: 28, status: 'inactive' }
    ],
    enrollments: [
        { studentId: 3, courseId: 1, progress: 65, status: 'in-progress' },
        { studentId: 3, courseId: 2, progress: 100, status: 'completed' }
    ]
};

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = mockData.users.find(u => u.email === email && u.password === password && u.role === role);
        if (user) {
            onLogin(user);
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>E-Learning Platform</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
                <div style={{marginTop: '20px', fontSize: '12px', color: '#666'}}>
                    <p><strong>Demo Credentials:</strong></p>
                    <p>Admin: admin@elearning.com / admin123</p>
                    <p>Instructor: instructor@elearning.com / inst123</p>
                    <p>Student: student@elearning.com / stud123</p>
                </div>
            </div>
        </div>
    );
}

function AdminDashboard({ user, onLogout }) {
    return (
        <div className="dashboard">
            <div className="sidebar">
                <h3>{user.name}</h3>
                <nav>
                    <a href="#" className="active">Dashboard</a>
                    <a href="#">Users</a>
                    <a href="#">Courses</a>
                    <a href="#">Analytics</a>
                    <a href="#">Settings</a>
                </nav>
            </div>
            <div className="main-content">
                <div className="header">
                    <h1>Admin Dashboard</h1>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
                
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Users</h3>
                        <div className="value">{mockData.users.length}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Total Courses</h3>
                        <div className="value">{mockData.courses.length}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Active Courses</h3>
                        <div className="value">{mockData.courses.filter(c => c.status === 'active').length}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Total Students</h3>
                        <div className="value">{mockData.courses.reduce((sum, c) => sum + c.students, 0)}</div>
                    </div>
                </div>

                <div className="card">
                    <h2>User Management</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockData.users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><span className="badge active">{user.role}</span></td>
                                    <td>
                                        <button className="btn-small">Edit</button>
                                        <button className="btn-small btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="card">
                    <h2>Course Overview</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Instructor</th>
                                <th>Students</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockData.courses.map(course => (
                                <tr key={course.id}>
                                    <td>{course.title}</td>
                                    <td>{course.instructor}</td>
                                    <td>{course.students}</td>
                                    <td><span className={`badge ${course.status}`}>{course.status}</span></td>
                                    <td>
                                        <button className="btn-small">View</button>
                                        <button className="btn-small btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function InstructorDashboard({ user, onLogout }) {
    return (
        <div className="dashboard">
            <div className="sidebar">
                <h3>{user.name}</h3>
                <nav>
                    <a href="#" className="active">Dashboard</a>
                    <a href="#">My Courses</a>
                    <a href="#">Create Course</a>
                    <a href="#">Students</a>
                    <a href="#">Analytics</a>
                </nav>
            </div>
            <div className="main-content">
                <div className="header">
                    <h1>Instructor Dashboard</h1>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
                
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>My Courses</h3>
                        <div className="value">{mockData.courses.length}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Total Students</h3>
                        <div className="value">{mockData.courses.reduce((sum, c) => sum + c.students, 0)}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Active Courses</h3>
                        <div className="value">{mockData.courses.filter(c => c.status === 'active').length}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Avg. Completion</h3>
                        <div className="value">78%</div>
                    </div>
                </div>

                <div className="card">
                    <h2>My Courses</h2>
                    <div className="course-grid">
                        {mockData.courses.map(course => (
                            <div key={course.id} className="course-card">
                                <img src={`https://via.placeholder.com/300x180/667eea/ffffff?text=${course.title}`} alt={course.title} />
                                <div className="course-card-content">
                                    <h3>{course.title}</h3>
                                    <p>{course.students} students enrolled</p>
                                    <span className={`badge ${course.status}`}>{course.status}</span>
                                    <div style={{marginTop: '15px'}}>
                                        <button className="btn-small">Edit</button>
                                        <button className="btn-small">View Students</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <h2>Recent Student Activity</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Course</th>
                                <th>Progress</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Jane Student</td>
                                <td>Web Development</td>
                                <td>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{width: '65%'}}></div>
                                    </div>
                                    65%
                                </td>
                                <td><span className="badge in-progress">In Progress</span></td>
                            </tr>
                            <tr>
                                <td>Jane Student</td>
                                <td>Data Science</td>
                                <td>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{width: '100%'}}></div>
                                    </div>
                                    100%
                                </td>
                                <td><span className="badge completed">Completed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StudentDashboard({ user, onLogout }) {
    const enrolledCourses = mockData.courses.filter(course => 
        mockData.enrollments.some(e => e.studentId === user.id && e.courseId === course.id)
    );

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h3>{user.name}</h3>
                <nav>
                    <a href="#" className="active">Dashboard</a>
                    <a href="#">My Courses</a>
                    <a href="#">Browse Courses</a>
                    <a href="#">Progress</a>
                    <a href="#">Certificates</a>
                </nav>
            </div>
            <div className="main-content">
                <div className="header">
                    <h1>Student Dashboard</h1>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
                
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Enrolled Courses</h3>
                        <div className="value">{enrolledCourses.length}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Completed</h3>
                        <div className="value">{mockData.enrollments.filter(e => e.status === 'completed').length}</div>
                    </div>
                    <div className="stat-card">
                        <h3>In Progress</h3>
                        <div className="value">{mockData.enrollments.filter(e => e.status === 'in-progress').length}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Certificates</h3>
                        <div className="value">1</div>
                    </div>
                </div>

                <div className="card">
                    <h2>My Courses</h2>
                    <div className="course-grid">
                        {enrolledCourses.map(course => {
                            const enrollment = mockData.enrollments.find(e => e.courseId === course.id);
                            return (
                                <div key={course.id} className="course-card">
                                    <img src={`https://via.placeholder.com/300x180/667eea/ffffff?text=${course.title}`} alt={course.title} />
                                    <div className="course-card-content">
                                        <h3>{course.title}</h3>
                                        <p>Instructor: {course.instructor}</p>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{width: `${enrollment.progress}%`}}></div>
                                        </div>
                                        <p style={{marginTop: '5px', fontSize: '12px'}}>{enrollment.progress}% Complete</p>
                                        <span className={`badge ${enrollment.status}`}>{enrollment.status}</span>
                                        <div style={{marginTop: '15px'}}>
                                            <button className="btn-small">Continue Learning</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="card">
                    <h2>Available Courses</h2>
                    <div className="course-grid">
                        {mockData.courses.filter(c => !enrolledCourses.includes(c)).map(course => (
                            <div key={course.id} className="course-card">
                                <img src={`https://via.placeholder.com/300x180/764ba2/ffffff?text=${course.title}`} alt={course.title} />
                                <div className="course-card-content">
                                    <h3>{course.title}</h3>
                                    <p>Instructor: {course.instructor}</p>
                                    <p>{course.students} students enrolled</p>
                                    <div style={{marginTop: '15px'}}>
                                        <button className="btn-small">Enroll Now</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function App() {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
    };

    if (!user) {
        return <Login onLogin={handleLogin} />;
    }

    switch (user.role) {
        case 'admin':
            return <AdminDashboard user={user} onLogout={handleLogout} />;
        case 'instructor':
            return <InstructorDashboard user={user} onLogout={handleLogout} />;
        case 'student':
            return <StudentDashboard user={user} onLogout={handleLogout} />;
        default:
            return <Login onLogin={handleLogin} />;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
