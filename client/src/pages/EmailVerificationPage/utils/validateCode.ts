import { Result } from "@/utils/results/Result.ts";

export const ONLY_NUMBERS_REGEX = /^\d+$/;

export default function validateCode(code: string, codeMaxLength: number): Result {
    if (code.length != codeMaxLength) {
        return Result.Fail(`Code length must be ${codeMaxLength} numbers long`);
    } else if (!ONLY_NUMBERS_REGEX.test(code)) {
        return Result.Fail("Code must contain only numbers and no letters");
    }

    return Result.Ok();
}
