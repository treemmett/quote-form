declare namespace App {
  export interface Quote {
    id: string;
    name: string;
    data: {
      employees11: number;
      employees12: number;
      hours: number;
      distance: number;
      insurance: number;
      initial: boolean;
      frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';
    };
  }
}
