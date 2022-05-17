import UserReports, { UserReportsProps } from "../UserReports";
import styles from "./ReportsTable.module.css";
import { FC } from "react";

interface ReportsTableProps {
  className?: string;
  setSorting?: any;
  sorting?: any;
  users: any[];
}

// import { FC } from 'react'
const ReportsTable: FC<ReportsTableProps> = ({
  className,
  users,
  setSorting,
  sorting
}: ReportsTableProps) => {

  const userReportsList = users;

  const onLabelClick = (label:string):any => {
    let categ = sorting["category"]
    let order = sorting["order"]

    if (categ == label) {
      if (order == "asc")
        order = "desc"
      else
        order = "asc"
    }else {
      categ = label
      order = "desc"
    }
    console.log(categ)
    console.log(order)
    setSorting({"category":categ, "order":order})
  }

  return (
    <div className={styles.mainContainer + " " + `${className}`}>
      <div className={styles.headerContainer}>
        <div className={styles.userInfoHeader}>
          <p>User Information</p>
        </div>
        <div className={styles.statsHeader}>
          <p onClick={() => onLabelClick("reports")}>Reports</p>
          <p onClick={() => onLabelClick("hate")}>HATE</p>
          <p onClick={() => onLabelClick("not")}>NOT</p>
          <p onClick={() => onLabelClick("profanity")}>PRFN</p>
          <p onClick={() => onLabelClick("race")}>RACE</p>
          <p onClick={() => onLabelClick("religion")}>REL</p>
          <p onClick={() => onLabelClick("sex")}>GEN</p>
          <p></p>
        </div>
      </div>
      <div className={styles.allStatsContainer}>
        {userReportsList.map((userReports) => (
          <UserReports
            key={userReports.user_id}
            user_id={userReports.user_id}
            username={userReports.username}
            email={userReports.email}
            google_photo={userReports.google_photo}
            totalPosts={userReports.totalPosts}
            reports={userReports.reports}
            hate_score={userReports.hate_score}
            normal_score={userReports.normal_score}
            profanity_score={userReports.profanity_score}
            race_score={userReports.race_score}
            religion_score={userReports.religion_score}
            sex_score={userReports.sex_score}
          />
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default ReportsTable;
