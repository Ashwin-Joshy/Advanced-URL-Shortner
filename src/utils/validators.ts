interface LoginInput {
    email: string;
    password: string;
}

export const validateLoginInput = (data: LoginInput): { error?: string } => {
    const errors: string[] = [];

    if (!data.email) {
        errors.push('Email is required.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Email must be a valid email address.');
    }

    if (!data.password) {
        errors.push('Password is required.');
    } else if (data.password.length < 6) {
        errors.push('Password must be at least 6 characters long.');
    } else if (data.password.length > 128) {
        errors.push('Password cannot exceed 128 characters.');
    }

    if (errors.length > 0) {
        return { error: errors.join(' ') };
    }

    return {};
};
interface SignupInput {
    username: string;
    password: string;
    email: string;
}

export const validateSignupInput = (data: SignupInput): { error?: string } => {
    const errors: string[] = [];

    if (!data.username || data.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long.');
    }

    if (!data.email) {
        errors.push('Email is required.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Email must be a valid email address.');
    }

    if (!data.password) {
        errors.push('Password is required.');
    } else if (data.password.length < 6) {
        errors.push('Password must be at least 6 characters long.');
    }

    if (errors.length > 0) {
        return { error: errors.join(' ') };
    }

    return {};
};

