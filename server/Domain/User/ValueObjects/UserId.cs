using Domain.Common;

namespace Domain.User.ValueObjects;

public class UserId : ValueObject
{
    public Guid Value { get; }
    
    public UserId(Guid value)
    {
        Value = value;
    }

    public UserId()
    {
        Value = Guid.NewGuid();
    }

    protected override IEnumerable<object?> GetPropertiesForComparison()
    {
        yield return Value;
    }
}
