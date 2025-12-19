import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    validateLoginInput,
    handleAuthSuccess,
    filterCourses,
    getNavigationByRole,
    loginUser
} from './authService';

// UNIT-тести
describe('UNIT-тести модуля авторизації Moveit', () => {

    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it('Має повертати помилку для Email без символу @', () => {
        const result = validateLoginInput('invalid-email', 'password123');
        expect(result.isValid).toBe(false);
        expect(result.errors.email).toBe("Введено некоректну адресу електронної пошти");
    });

    it('Має повертати помилку, якщо пароль менше 8 символів', () => {
        const result = validateLoginInput('test@sumdu.edu.ua', '12345');
        expect(result.isValid).toBe(false);
        expect(result.errors.password).toBe("Пароль має бути не менше 8 символів");
    });

    it('Має підтверджувати валідність при коректних даних', () => {
        const result = validateLoginInput('student@teachio.com', 'securePassword2025');
        expect(result.isValid).toBe(true);
    });

    it('Має фільтрувати курси без урахування регістру', () => {
        const courses = [{ name: 'React Basic' }, { name: 'Node.js' }, { name: 'TypeScript' }];
        const result = filterCourses(courses, 'REacT');
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('React Basic');
    });

    it('Має повертати специфічне меню для ролі викладача', () => {
        const menu = getNavigationByRole('teacher');
        expect(menu).toContain('Manage Content');
        expect(menu).not.toContain('Admin Panel');
    });

    it('Адміністратор має бачити всі пункти меню', () => {
        const menu = getNavigationByRole('admin');
        expect(menu).toEqual(['Home', 'My Courses', 'Manage Content', 'Admin Panel']);
    });
});

// Тести Spy, Mocking
describe('Інтеграційні тести API (Mocking)', () => {
    it('Має зберігати JWT токен у localStorage при успіху', () => {
        const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
        const token = "eyJhbGci.eyJzdWIi.signature";

        const success = handleAuthSuccess(token);

        expect(success).toBe(true);
        expect(setItemSpy).toHaveBeenCalledWith('Moveit_token', token);
    });

    it('Має успішно отримувати токен від API при правильних даних', async () => {
        // Mock-відповідь сервера
        const mockResponse = { token: 'fake-jwt-token' };

        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse,
        });
        vi.stubGlobal('fetch', fetchMock);

        const data = await loginUser({ email: 'test@sumdu.edu.ua', password: 'password123' });

        // Перевірка заємодії з сервером
        expect(fetchMock).toHaveBeenCalledWith('https://api.moveit.com/login', expect.any(Object));
        expect(data.token).toBe('fake-jwt-token');

        vi.unstubAllGlobals();
    });
});