export function validateUser(user) {
    const errors = [];

    if (!user.email || typeof user.email !== 'string' || !isValidEmail(user.email)) {
        errors.push('Invalid email');
    }

    if (!user.password || typeof user.password !== 'string' || user.password.length < 8) {
        errors.push('Password must be a string at least 8 characters long');
    }

    if (!user.firstName || typeof user.firstName !== 'string' || user.firstName.trim().length === 0) {
        errors.push('First name is required');
    }

    if (!user.lastName || typeof user.lastName !== 'string' || user.lastName.trim().length === 0) {
        errors.push('Last name is required');
    }

    if (!user.country || typeof user.country !== 'string' || user.country.trim().length === 0) {
        errors.push('Country is required');
    }


    return errors;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function sanitizeUser(user) {
    return {
        email: user.email.toLowerCase().trim(),
        password: user.password,
        firstName: user.firstName.trim(),
        lastName: user.lastName.trim(),
        country: user.country.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),

    };
}