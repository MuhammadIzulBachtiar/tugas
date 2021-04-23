import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ApiService } from 'src/app/services/api.service';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
@Component({
 selector: 'app-product',
 templateUrl: './product.component.html',
 styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 title:any;
 book:any={};
 books:any=[];
  id: string | undefined;
 constructor(
   public dialog:MatDialog,
   public api:ApiService
 )
 {
   this.title='Produk'; 
   this.getBooks();   
 }
 ngOnInit(): void {
  
 }
 loading:boolean | undefined;
 getBooks()
  {
    this.loading=true;
    this.api.get('bookswithauth').subscribe(result=>{
      this.books=result;
      this.loading=false;
    },error=>{
      this.loading=false;
      alert('Ada masalah saat pengambilan data. Coba lagi');
    })
    /*
    this.loading=true;
    this.api.get('books').subscribe(result=>{
      this.books=result;
      this.loading=false;
    },error=>{
      this.loading=false;
      alert('Ada masalah saat pengambilan data. Coba lagi');
    })
    */
  }


 productDetail(data: any,idx: number)
 {
   let dialog=this.dialog.open(ProductDetailComponent, {
     width:'400px',
     data:data
   });
   dialog.afterClosed().subscribe(res=>{
     if(res)
     {
       if(idx==-1)this.books.push(res);
       else this.books[idx]=data;
     }
   })
 }
 
 loadingDelete:any={};
 deleteProduct(idx: string | number)
 {
   var conf=confirm('Delete item?');
   if(conf)
   {
    this.loadingDelete[idx]=true;
     this.api.delete('books/'+this.books[idx].id).subscribe(_result=>{
       this.books.splice(idx,1);
       this.loadingDelete[idx]=false;
     },_error=>{
      this.loadingDelete[idx]=false;
       alert('Tidak dapat menghapus data');
     });
    }
  }

uploadFile(data: any)
{
 let dialog=this.dialog.open(FileUploaderComponent, {
   width:'400px',
   data:data
 });
 dialog.afterClosed().subscribe(res=>{
   return;
 })
}

}