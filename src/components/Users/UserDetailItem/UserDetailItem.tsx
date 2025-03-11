interface UserDetailItemProps {
  field: string;
  value: string | number;
}

const UserDetailItem = ({ field, value }: UserDetailItemProps) => {
  return (
    <div>
      <h3>{field}</h3>
      <p>{value}</p>
    </div>
  );
};

export default UserDetailItem;
