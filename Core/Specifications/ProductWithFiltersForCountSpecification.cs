using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductSpecParams productParams)
            : base(product =>
                (string.IsNullOrEmpty(productParams.Search) || product.Name.ToLower().Contains(productParams.Search)) &&
                (!productParams.BrandId.HasValue || product.ProductBrandId == productParams.BrandId) &&
                (!productParams.TypeId.HasValue || product.ProductTypeId == productParams.TypeId))
        {
        }
    }
}