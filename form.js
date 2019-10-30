Number.prototype.withCommas = function() {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Form {
    formValues = {
        "vocation": '',
        "magicLevel": {"from": 0, "to": 0},
        "experienceLevel": {"from": 0, "to": 0},
        "promoted": false,
        "dailyRewards": false,
        "food": "ham",
        "rune": "avalanche"
    }

    constructor() {
        this.form = document.querySelector("form");
        this.character = new Character(this.formValues);
        this.magicCalculation = new MagicLevel(this.character, this.formValues);
        this.experienceCalculation = new ExperienceLevel(this.character, this.formValues);
        
        this.recalc();
    }

    recalc() {
        this.getFormValues();
        this.checkValues();
        this.display();
    }

    display() {
        const manaToLevelEl = document.querySelector("input[name=manaToLevel]");
        const manaPerHourEl = document.querySelector("input[name=manaPerHour]");
        const timeToMagicLevelEl = document.querySelector("input[name=timeToMagicLevel]");
        const foodToMagicLevelEl = document.querySelector("input[name=foodToMagicLevel]");
        const runesToMagicLevelEl = document.querySelector("input[name=runesToMagicLevel]");

        manaToLevelEl.value = this.magicCalculation.manaBetweenLevels().withCommas();
        manaPerHourEl.value = this.character.manaRegenPerHour().withCommas();
        timeToMagicLevelEl.value = this.magicCalculation.timeBetweenLevels();
        foodToMagicLevelEl.value = this.character.foodForMana(this.magicCalculation.manaBetweenLevels()).withCommas();
        runesToMagicLevelEl.value = this.magicCalculation.runesForMana(this.magicCalculation.manaBetweenLevels()).withCommas();

        const experienceToLevelEl = document.querySelector("input[name=experienceToLevel]");

        experienceToLevelEl.value = this.experienceCalculation.experienceBetweenLevels().withCommas();
    }

    getFormValues() {
        const vocationEl = this.form.querySelector("select");
        const promoted = this.form.querySelector("input[name=promotion]");
        const dailyRewards = this.form.querySelector("input[name=dailyRewards]");
        const mLvlEl = this.form.querySelector("input[name=magicLevel]");
        const eLvlEl = this.form.querySelector("input[name=experienceLevel]");
        const toMLvlEl = this.form.querySelector("input[name=toMagicLevel]");
        const toELvlEl = this.form.querySelector("input[name=toExperienceLevel]");

        this.formValues.vocation = vocationEl.value;
        this.formValues.promoted = promoted.checked;
        this.formValues.dailyRewards = dailyRewards.checked;
        this.formValues.magicLevel.from = parseInt(mLvlEl.value);
        this.formValues.experienceLevel.from = parseInt(eLvlEl.value);
        this.formValues.magicLevel.to = parseInt(toMLvlEl.value);
        this.formValues.experienceLevel.to = parseInt(toELvlEl.value);
    }

    checkValues() {
        if (this.formValues.magicLevel.from >= this.formValues.magicLevel.to) {
            const toMLvlEl = this.form.querySelector("input[name=toMagicLevel]");

            toMLvlEl.value = this.formValues.magicLevel.from + 1;
        }

        if (this.formValues.experienceLevel.from >= this.formValues.experienceLevel.to) {
            const toELvlEl = this.form.querySelector("input[name=toExperienceLevel]");

            toELvlEl.value = this.formValues.experienceLevel.from + 1;
        }

        this.getFormValues();
    }
}