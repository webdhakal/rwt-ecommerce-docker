const GUEST_PREFIX = 'guest/';
const AUTH_PREFIX = 'auth/';
const USER_PREFIX = 'users/';

function withGuestPrefix(path: string) {
    return `${GUEST_PREFIX}${path}`;
}

function withAuthPrefix(path: string) {
    return `${AUTH_PREFIX}${path}`;
}

function withUserPrefix(path: string) {
    return `${USER_PREFIX}${path}`;
}

export const ROUTES = {
    AUTH: {
        REGISTER: withAuthPrefix('register'),
        ME: withAuthPrefix('me'),
    },
    GUEST: {
        LOGIN: withGuestPrefix('login'),
    },
    USER: {
        PROFILE: withUserPrefix('profile'),
        USERS: withUserPrefix('users'),
        CATEGORIES: withUserPrefix('categories'),
        DEPARTMENTS: withUserPrefix('departments'),
        FUNDS: withUserPrefix('funds'),
        SUBACCOUNTS: withUserPrefix('sub-accounts'),
        SUBCATEGORIES: withUserPrefix('sub-categories'),
        EMPLOYEES: withUserPrefix('employees'),
        BUDGETS: withUserPrefix('wages'),
        ACTUAL_WAGES: withUserPrefix('actual-wages'),
        EMPLOYEE_TYPES: withUserPrefix('employee-types'),
    },
};
