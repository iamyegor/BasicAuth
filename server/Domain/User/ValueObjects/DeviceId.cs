using Domain.Common;
using Domain.DomainErrors;
using XResults;

namespace Domain.User.ValueObjects;

public class DeviceId : ValueObject
{
    public Guid Value { get; }

    protected DeviceId() { }

    private DeviceId(Guid value)
    {
        Value = value;
    }

    public static Result<DeviceId, Error> Create(string? input)
    {
        if (string.IsNullOrWhiteSpace(input) || !Guid.TryParse(input, out Guid deviceId))
        {
            return Errors.DeviceId.IsInvalid;
        }

        return new DeviceId(deviceId);
    }

    protected override IEnumerable<object?> GetPropertiesForComparison()
    {
        yield return Value;
    }
}
