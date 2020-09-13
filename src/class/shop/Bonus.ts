export default class Bonus {
  private bonusTarget: string;
  private bonusAmount: number;
  private text: string;
  repetition: "once" | "perTick";

  constructor(bonusTarget: string, bonusAmount: number, text: string, repetition: 'once' | 'perTick') {
    this.bonusTarget = bonusTarget;
    this.bonusAmount = bonusAmount;
    this.text = text;
    this.repetition = repetition;
  }
}
