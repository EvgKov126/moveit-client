export const validateLoginInput = (email: string, password: string) => {
    const errors: { email?: string; password?: string } = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Введено некоректну адресу електронної пошти";
    }
    if (!password || password.length < 8) {
        errors.password = "Пароль має бути не менше 8 символів";
    }
    return { isValid: Object.keys(errors).length === 0, errors };
};

export const handleAuthSuccess = (token: string): boolean => {
    if (!token) return false;
    localStorage.setItem('Moveit_token', token);
    return true;
};

export const filterCourses = (courses: { name: string }[], query: string) => {
    if (!query) return courses;
    const lowerQuery = query.toLowerCase();
    return courses.filter(course => course.name.toLowerCase().includes(lowerQuery));
};

export const getNavigationByRole = (role: string) => {
    const menu = ['Home'];
    if (role === 'student' || role === 'admin') menu.push('My Courses');
    if (role === 'teacher' || role === 'admin') menu.push('Manage Content');
    if (role === 'admin') menu.push('Admin Panel');
    return menu;
};

export const loginUser = async (credentials: any) => {
    const response = await fetch('https://api.moveit.com/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error('Unauthorized');
    return await response.json();
};