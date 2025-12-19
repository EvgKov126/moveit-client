import { describe, it, expect } from 'vitest';
import {
    validateLoginInput
} from './authService';

//Cucumber-тести
describe('Cucumber BDD: Smoke-тести авторизації', () => {
    it('Scenario: Успішна валідація даних', () => {
        // Given
        const email = "student@teachio.com";
        const password = "securePassword2025";
        // When
        const result = validateLoginInput(email, password);
        // Then
        expect(result.isValid).toBe(true);
    });

    it('Scenario: Помилка при некоректному email', () => {
        // Given
        const email = "invalid-email";
        // When
        const result = validateLoginInput(email, 'anyPassword123');
        // Then
        expect(result.errors.email).toBe("Введено некоректну адресу електронної пошти");
    });
});