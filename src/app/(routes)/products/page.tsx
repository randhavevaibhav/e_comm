
import { ProductCard } from "./_products-components/product-card";


export default function ProductsPage() {
 
  
  return (
    <div>
      <h2 className="font-semibold text-2xl my-2">Product page</h2>

      <div className="border mt-8 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-2 gap-y-4 p-2">
        {Array.from({
          length:8
        },(_,id)=>id*8).map((val,idx)=>{
          return (<ProductCard key={`${idx}_${val}`}/>)
        })}
      </div>
    </div>
  );
}
