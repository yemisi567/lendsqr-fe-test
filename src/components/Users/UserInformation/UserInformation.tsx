import { IUserDetails } from "../../../types/types";
import styles from "../Users.module.scss";
import UserDetailItem from "../UserDetailItem/UserDetailItem";
import UserDetailSection from "../UserDetailSection/UserDetailSection";

const UserInformation = ({ user }: { user: IUserDetails }) => {
  return (
    <>
      <UserDetailSection
        heading="Personal Information"
        className={styles.user_details_main_content}
      >
        <UserDetailItem field="Full Name" value={user.name} />
        <UserDetailItem field="Phone Number" value={user.phone} />
        <UserDetailItem field="Email Address" value={user.email} />
        <UserDetailItem field="BVN" value={user.BVN} />
        <UserDetailItem field="Gender" value={user.gender} />
        <UserDetailItem field="Marital Status" value={user.marital_status} />
        <UserDetailItem field="Children" value={user.children} />
        <UserDetailItem field="Type of residence" value={user.residence} />
      </UserDetailSection>

      <UserDetailSection
        heading="Education and Employment"
        className={styles.user_details_main_content}
      >
        <UserDetailItem field="level of education" value={user.education} />
        <UserDetailItem field="Employment Status" value={user.employment} />
        <UserDetailItem field="Sector of Employment" value={user.sector} />
        <UserDetailItem
          field="Duration of employment"
          value={`${user.duration} ${user.duration > 1 ? "years" : "year"}`}
        />
        <UserDetailItem field="Office Email" value="test@gmail.com" />
        <UserDetailItem field="Monthly Income" value={user.monthly_income} />
        <UserDetailItem field="Loan Repayment" value={user.repayment} />
      </UserDetailSection>

      <UserDetailSection
        heading="Socials"
        className={styles.user_details_main_content}
      >
        <UserDetailItem field="Twitter" value={user.twitter} />
        <UserDetailItem field="Facebook" value={user.facebook} />
        <UserDetailItem field="Instagram" value={user.instagram} />
      </UserDetailSection>

      {user.guarantors.map((guarantor, index) => (
        <UserDetailSection
          className={styles.user_details_main_content}
          heading={index === 0 ? "Guarantors" : ""}
          key={index + guarantor.name}
        >
          <UserDetailItem field="Full Name" value={guarantor.name} />
          <UserDetailItem field="Phone Number" value={guarantor.phone} />
          <UserDetailItem field="Email Address" value={guarantor.email} />
          <UserDetailItem field="Relationship" value={guarantor.relationship} />
        </UserDetailSection>
      ))}
    </>
  );
};

export default UserInformation;
