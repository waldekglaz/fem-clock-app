interface CategoryItemProps {
  title: string;
  value: string | number | undefined;
}

const CategoryItem = ({ title, value }: CategoryItemProps) => {
  return (
    <div className="category">
      <h3 className="title">{title}</h3>
      <p className="value">{value}</p>
    </div>
  );
};

export default CategoryItem;
