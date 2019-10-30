class MagicLevel {
    mana = {
        "multiplier": {"mage": 1.1, "knight": 3, "paladin": 1.4},
        "startValue": 1600
    }

    constructor(character, formValues) {
        this.character = character;
        this.formValues = formValues;
        this.rune = new Rune();
    }

    manaToLevel(level) {
        const multiplier = this.mana.multiplier[this.formValues.vocation];
        const manaEndLevel = Math.round(this.mana.startValue * Math.pow(multiplier, level));

        return manaEndLevel;
    }

    manaBetweenLevels() {
        const beginLevel = this.formValues.magicLevel.from + 1;
        const endLevel = this.formValues.magicLevel.to;

        let i = beginLevel;
        let runningTotal = 0;

        while (i >= beginLevel && i <= endLevel) {
            runningTotal = runningTotal + this.manaToLevel(i);

            i = i + 1;
        }

        return runningTotal;
    }

    timeToLevel(manaToLevel) {
        const manaRegen = this.character.manaRegenPerMinute();

        let timeToNext = manaToLevel / manaRegen;

        let seconds = timeToNext * 60;
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
        seconds = Math.round(seconds);

        let asString = days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds";
        
        return asString;
    }

    timeBetweenLevels() {
        const manaBetween = this.manaBetweenLevels();

        return this.timeToLevel(manaBetween);
    }

    runesForMana(mana) {
        return Math.ceil(mana / this.rune[this.formValues.rune].manaCost);
    }
}