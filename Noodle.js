const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    STYLES:  Symbol("style"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks")
});

module.exports = class NoodleOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sStyles = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "noodle";
        this.nPrice = 0;
        this.bPriceTag = true;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Shuwen's Noodle.");
                aReturn.push("What size would you like?(large,middle,small)");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.STYLES
                this.sSize = sInput;
                aReturn.push("What noodle style would you like?(classical,rice noodle,thin)");
                break;
            case OrderState.STYLES:
                this.stateCur = OrderState.TOPPINGS
                this.sStyles = sInput;
                aReturn.push("What topping would you like?(beef,chicken,ham)");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sToppings = sInput;
                aReturn.push("Would you like drinks with that?(apple juice,lemon tea,no)");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                this.sDrinks = sInput;
                if(sInput.toLowerCase() != 'no'){
                    this.nPrice += 1;
                }
                switch(this.sSize){
                    case 'large': 
                        this.nPrice += 15;
                        break;
                    case 'middle': 
                        this.nPrice += 12;
                        break;
                    case 'small': 
                        this.nPrice += 10;
                        break;
                    default:
                        this.bPriceTag = false;
                }
                if(this.bPriceTag){
                    aReturn.push("Thank-you for your order of");
                    aReturn.push(`${this.sSize} size ${this.sStyles} ${this.sItem} with ${this.sToppings}, 
                    the total price is $${this.nPrice} CAD`);
                    if(this.sDrinks.toLowerCase() != 'no'){
                        aReturn.push(`Together with the drink: ${this.sDrinks}`);
                    }
                    let d = new Date(); 
                    d.setMinutes(d.getMinutes() + 20);
                    aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                    break;
                }
                else{
                    aReturn.push("Thank-you for ordering, but your order beyond our service.Welcome your new order.");
                    break;
                }
        }
        return aReturn;
    }
}