export function validateInputs(inputArr: string[]) {
    return (req, res, next) => {
        if (!inputArr || inputArr.length === 0) {
            return next();
        }
        let errors: any[] = [];
        req.validData = {};
        inputArr.forEach((input) => {
            if (req.body[input] === undefined) {
                errors.push(input);
            }
            req.validData[input] = req.body[input];
        });
        if (errors.length > 0) {
            return res.status(400).json({
                status: "fail",
                message: "provide the correct parameters",
                missedInputs: errors
            });
        }
        return next();
    }
}
