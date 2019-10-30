class ExperienceLevel {
    constructor(character, formValues) {
        this.formValues = formValues;
    }

    experienceToLevel(x) {
        let firstEl = (((50 * Math.pow(x, 3)) / 3) - (100 * Math.pow(x, 2)));
        let secondEl = ((850 * x) / 3) - 200;

        return firstEl + secondEl;
    }

    experienceBetweenLevels() {
        let currentLevel = this.formValues.experienceLevel.from;
        let nextLevel = this.formValues.experienceLevel.to;

        let diff = this.experienceToLevel(nextLevel) - this.experienceToLevel(currentLevel);

        return Math.round(diff);
    }
}