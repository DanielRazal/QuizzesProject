
const validateQuestion = (req, res) => {
    if (!req.body.title) {
        return 'Please enter a title';
    }
    if (!req.body.typeId) {
        return 'Please select the question structure';
    }
    if (req.body.tags.length < 1) {
        return 'Please enter at least one tag';
    }

    if (req.body.answers.length < 2) {
        return 'Please enter at least two answers';
    }
    for (let i = 0; i < req.body.answers.length; i++) {
        if (!req.body.answers[i].text) {
            return 'The text is empty';
        }
    }
    return undefined;
}

const validateQuiz = (req, res) => {

    // const languageName = req.body.language.name || req.body['languageId'];

    if (!req.body.name) {
        return 'Please enter a name';
    }

    if (req.body.language) {
        if (!req.body.language.name) {
            return 'Please select a language';
        }
    } else if (!req.body.languageId) {
        return 'Please select a language';
    }

    // if (!req.body.language || !req.body.language.name) {
    //     return 'Please select a language';
    // }
    // if (!req.body.type.name) {
    //     return 'Please select the quiz structure';
    // }
    if (!req.body.passingGrade) {
        return 'Please enter passing grade';
    }
    if (req.body.passingGrade < 1 || req.body.passingGrade > 100) {
        return 'Please enter a passing grade between 1 and 100';
    }
    if (!req.body.msgOnSuccess) {
        return 'Please enter message on success';
    }
    if (!req.body.msgOnFailure) {
        return 'Please enter message on failure';
    }
    if (req.body.questions.length < 1) {
        return 'Please choose at least one question for the quiz';
    }
    return undefined;
}

const validateAdminLogin = (user, req, res) => {

    if (!req.body.email) {
        return 'Please enter a email';
    }
    if (!req.body.password) {
        return 'Please enter a password';
    }
    if (!user) {
        return 'The user does not exist';
    }
    return undefined;
}

const validateStudentLogin = (user, req, res) => {

    if (!req.body.email) {
        return 'Please enter a email';
    }
    if (!req.body.fullName) {
        return 'Please enter your full name';
    }
    if (!user) {
        return 'The user does not exist';
    }
    return undefined;
}

module.exports = {
    validateQuestion,
    validateQuiz,
    validateAdminLogin,
    validateStudentLogin
}
