import { products } from "@/data/products";
import { ProductCard } from "@/modules/products/components/ProductCard";

export default function ProductsPage() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {
                products.map(product=>(
                    <ProductCard key={product.id}  {...product}/>
                ))
            }
        </div>
    )
}
