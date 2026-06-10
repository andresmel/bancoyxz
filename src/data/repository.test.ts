import repository from './repository';

describe('repository', () => {
  it('returns users array with 3 users', () => {
    const { users } = repository();
    expect(users).toHaveLength(3);
  });

  it('returns accountDetails array with 3 accounts', () => {
    const { accountDetails } = repository();
    expect(accountDetails).toHaveLength(3);
  });

  it('each user has required fields', () => {
    const { users } = repository();
    users.forEach(user => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('password');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('username');
    });
  });

  it('first user matches expected data', () => {
    const { users } = repository();
    expect(users[0]).toMatchObject({
      email: 'johndoe@example.com',
      password: 'password123',
      name: 'John Doe',
    });
  });

  it('each accountDetail has required fields', () => {
    const { accountDetails } = repository();
    accountDetails.forEach(account => {
      expect(account).toHaveProperty('id');
      expect(account).toHaveProperty('id_user');
      expect(account).toHaveProperty('account_number');
      expect(account).toHaveProperty('balance');
    });
  });
});
