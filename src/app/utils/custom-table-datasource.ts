import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject } from "rxjs";

export class CustomDataSource extends  MatTableDataSource<any> {
    mySubject = new BehaviorSubject<any[]>([]);

    constructor(){
        super()
    }

    sortDataTable() {
        console.log('on sort',this.data, this.sort)
        if (!this.sort.active || this.sort.direction === '') {
            this.data = this.data;
            return;
        }

        this.data = this.data.sort((a, b) => {
        const isAsc = this.sort.direction === 'asc';
        switch (this.sort.active) {
            case 'Order Date/Time': return this.compare(a.order_date, b.order_date, isAsc);
            case 'Pickup Date/Time': return this.compare(a.order_due_date, b.order_due_date, isAsc);
            case 'Order Number': return this.compare(a.order_number, b.order_number, isAsc);
            case 'Customer Name': return this.compare(a.fullName, b.fullName, isAsc);
            case 'Address': return this.compare(a.fullAddress, b.fullAddress, isAsc);
            case 'Customer Phone': return this.compare(a.customer_phone_number, b.customer_phone_number, isAsc);
            case 'Status': return this.compare(a.status, b.status, isAsc);
            case 'Timer': return this.compare(a.timer, b.timer, isAsc);
            case 'Category': return this.compare(a.category_name, b.category_name, isAsc);
            case 'Menu Item': return this.compare(a.title, b.title, isAsc);
            case 'Options': return this.compare(a.options, b.options, isAsc);
            case 'Special Instructions': return this.compare(a.product_instructions, b.product_instructions, isAsc);
            case 'Quantity': return this.compare(a.product_qty, b.product_qty, isAsc);
            case 'Status': return this.compare(a.statusDetail, b.statusDetail, isAsc);
            default: return this.compare(a.order_status_id, b.order_status_id, isAsc);
            }
        });
        this.mySubject.next(this.data)
    }
        compare(a: number | string, b: number | string, isAsc: boolean) {
          return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
        }
}