export const roleSchema = {
    name: String,
    permissions: [String]
};

export function validateRole(role) {
    const errors = [];

    if (!role.name || typeof role.name !== 'string') {
        errors.push('Name is required and must be a string');
    }

    if (!Array.isArray(role.permissions)) {
        errors.push('Permissions must be an array');
    }

    return errors;
}