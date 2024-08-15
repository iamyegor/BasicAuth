using Domain.Common;
using Domain.User.ValueObjects;

namespace Domain.User;

public class User : AggregateRoot<UserId>
{
    public Login Login { get; }
    public Email Email { get; }
    public Password Password { get; private set; }
    public EmailVerificationCode? EmailVerificationCode { get; private set; } =
        EmailVerificationCode.CreateRandom();
    public IReadOnlyList<RefreshToken> RefreshTokens => _refreshTokens;
    private readonly List<RefreshToken> _refreshTokens = [];
    public bool IsEmailVerified { get; private set; }
    public PasswordResetToken? PasswordResetToken { get; private set; }

    protected User()
        : base(new UserId()) { }

    public User(Login login, Email email, Password password)
        : base(new UserId())
    {
        Login = login;
        Email = email;
        Password = password;
        IsEmailVerified = false;
    }

    public void AddRefreshToken(RefreshToken refreshToken)
    {
        _refreshTokens.RemoveAll(rt => rt.DeviceId == refreshToken.DeviceId);
        _refreshTokens.Add(refreshToken);
    }

    public bool IsRefreshTokenExpired(DeviceId deviceId)
    {
        return RefreshTokens.First(x => x.DeviceId == deviceId).IsExpired;
    }

    public void VerifyEmail()
    {
        IsEmailVerified = true;
        EmailVerificationCode = null;
    }

    public void NewVerificationCode()
    {
        EmailVerificationCode = EmailVerificationCode.CreateRandom();
    }

    public void GeneratePasswordResetToken()
    {
        PasswordResetToken = PasswordResetToken.GenerateRandom();
    }

    public void ResetPassword(Password newPassword)
    {
        Password = newPassword;
        PasswordResetToken = null;
    }
}
