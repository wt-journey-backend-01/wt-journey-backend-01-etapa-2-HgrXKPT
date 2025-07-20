// utils/validators.js
const { isValid, parseISO, isAfter } = require('date-fns');

function validateDate(dateString) {
    if (!dateString) return false;
    
    const date = parseISO(dateString);
    if (!isValid(date)) return false;
    
    // Verifica se a data não está no futuro
    return !isAfter(date, new Date());
}

// Você pode adicionar outras funções de validação aqui também
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

module.exports = {
    validateDate,
    validateEmail
    // exporte outras funções conforme necessário
};