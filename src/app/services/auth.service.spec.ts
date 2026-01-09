import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AuthService] });
    service = TestBed.inject(AuthService);

    // Mock LocalStorage
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('harus membuat service', () => {
    expect(service).toBeTruthy();
  });

  it('harus berhasil register user baru', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify([]));
    const result = service.register('tom', '123');
    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('harus mengupdate foto profil', () => {
    const currentUser = { username: 'tom', role: 'user', photoUrl: null };
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'currentUser') return JSON.stringify(currentUser);
      if (key === 'users') return JSON.stringify([currentUser]);
      return null;
    });

    service.updateProfilePhoto('data:image/png;base64,123');
    expect(localStorage.setItem).toHaveBeenCalledWith('currentUser', expect.stringContaining('base64,123'));
  });
});