const resetBtn = document.getElementById('reset')
const input = document.forms['form']
const billCost = document.getElementById('bill')
const customPercentage = document.getElementById('custom')
const numberOfPeople = document.querySelector('#number-of-people')
const tipAmountElement = document.getElementById('tip-amount')
const totalAmountElement = document.getElementById('total-amount')
const warning = document.querySelector('.red-warning')




var active
var tipPercentage = 0
// setInterval(() => console.log(numberOfPeople.value), 2000)

class mathOperations {
    static calculate() {
        var billValue = parseInt(billCost.value)
        var tipPercentage = Operations.getTipPercentage(active)
        var peopleNum = parseInt(numberOfPeople.value)
        var tipAmount =  tipPercentage * billValue / peopleNum
        var total = (tipPercentage * billValue + billValue) / peopleNum
        console.log(tipPercentage)
        if (billCost.value != '' && numberOfPeople.value != '' && tipPercentage != 0) {
             tipAmountElement.textContent = '$' + this.round(tipAmount) 
             totalAmountElement.textContent = '$' + this.round(total)
            } else {
                tipAmountElement.textContent = '$0.0' 
                totalAmountElement.textContent = '$0.0'
            }
          '$0.0'
        // console.log(total)
    }

    static round(num) {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    }
}

class Operations {

    static reset() {
        billCost.value = ''
        numberOfPeople.value = ''
        customPercentage.value = ''
        numberOfPeople.value = ''
        tipAmountElement.textContent = '$0.0'
        totalAmountElement.textContent = '$0.0'
        this.removeActive(-1)
        this.deactivateReset()

    }

    static removeCustom() {
        customPercentage.value = ''
    }

    static removeActive(index) {
        for (let i = 0; i < tips.length; i++) {
            if (i != index)
            tips[i].classList.remove('active')
        }
    }

    
    static  getTipPercentage(index) {
        switch (index) {
            case 0:
                return 0.05
                break;
            case 1:
                return 0.10
                break;
            case 2:
                return 0.15
                break;
            case 3:
                return 0.2
                break;
            case 4:
                return 0.25
                break;
            case 5: 
                return parseInt(customPercentage.value) * 0.01
                break;
            default:
                break;
        }

        
    }

    static activateReset() {
        resetBtn.style.setProperty('background-color', 'var(--strong-cyan)')
        resetBtn.style.setProperty('cursor', 'pointer')
        resetBtn.style.setProperty('color', 'var(--very-dark-cyan)')
    }

    static deactivateReset() {
        resetBtn.style.setProperty('background-color', 'hsl(183, 100%, 22%)')
        resetBtn.style.setProperty('cursor', 'initial')
        resetBtn.style.setProperty('color', 'hsla(183, 100%, 15%, 0.699)')
    }
}


// add event listner for the form 

const tips = document.querySelectorAll('.tips div')

// if any tip is applied
tips.forEach((tip, index) => {
    tip.addEventListener('click', (e) => {
        if (!tip.classList.contains('active')) {
            tip.classList.add('active')
            tipPercentage = Operations.getTipPercentage(index)
            active = index
            Operations.removeActive(index)
            Operations.activateReset()
        }
        Operations.removeCustom()
        mathOperations.calculate()
    })
})


// listen for input from input fields
billCost.addEventListener('keyup', (element) => {
    mathOperations.calculate()
})

numberOfPeople.addEventListener('keyup', () => {
    Operations.activateReset()
    if(numberOfPeople.value == 0) {
        warning.style.setProperty('display', 'inline')
        numberOfPeople.style.setProperty('outline', '3px solid red')
    } else {
        warning.style.setProperty('display', 'none')
        numberOfPeople.style.setProperty('outline', '3px solid var(--strong-cyan')
    }
    mathOperations.calculate()
})


customPercentage.addEventListener('keyup', () => {
    active = 5
    Operations.activateReset()
    Operations.removeActive(-1)
    mathOperations.calculate()
})

// reset the operations

resetBtn.addEventListener('click',() => Operations.reset())

