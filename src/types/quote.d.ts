declare namespace App {
  export interface Quote {
    [index: string]: any;
    id: string;
    data: {
      [index: string]: any;
      name: string;
      description: string;
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
