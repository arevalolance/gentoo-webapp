import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useEffect, useState,  } from "react";
import TimelineContainer from "../components/TimelineContainer";
import MoreInformation from "../components/MoreInformation";
import ReportsTable from "../components/ReportsTable";
import Dashboard from "../components/Dashboard";
import UserSearch from "../components/UserSearch";
import { UserReportsProps } from "../components/UserReports";
import FilterBox, { FilterProp } from "../components/FilterBox";
import { getAPIRoute } from "../tags/apiRoutes";

const Timeline: NextPage = () => {
  const [users, setUsers] = useState<UserReportsProps[]>([]);
  const [filters, setFilters] = useState<FilterProp[]>([]);
  const [name, setName] = useState<string>("");
  const [sorting, setSorting] = useState<any>({"category":"hate", "order":"desc"})
  const [pagination, setPagination] = useState<any>({"offset":0, "limit":10});

  useEffect(() => {
    onQueryChange()
  }, [filters, name, sorting]);

  useEffect(() => {
    if (pagination["offset"] !=0 )
      onPagination()
  }, [pagination]);

  const onChangeName = (user: any): any => {
    console.log(user)
    setName(user)
  };

  const onPagination = () : any => {
    axios.post(getAPIRoute().AdminEndPoint + "get-filtered-users/", {
      data:JSON.stringify({
          name: name,
          filters: filters, 
          sorting: sorting,
          pagination: pagination
        })
    }).then((res) => {
      console.log("pagination")
      const appended = users.concat(res.data)
      setUsers(appended)
    })
  }

  const onQueryChange = () : any => {
    axios.post(getAPIRoute().AdminEndPoint + "get-filtered-users/", {
      data:JSON.stringify({
          name: name,
          filters: filters, 
          sorting: sorting,
          pagination: {"offset":0, "limit":10}
        })
    }).then((res) => {
      setUsers(res.data)
    })
  }

  return (
    <div className="flex flex-row justify-center">
      <Sidebar />
      <TimelineContainer heading={"Users Overview"}>
        <Dashboard
          userTotal={"13613"}
          reportedPostTotal={"6235"}
          postTotal={"66236"}
          reportedUserTotal={"2366"}
        />
        <ReportsTable 
          className="mt-5" 
          users={users} 
          sorting={sorting} 
          setSorting={setSorting}
          pagination={pagination}
          setPagination={setPagination}
        />
      </TimelineContainer>
      <MoreInformation className="flex flex-col gap-1 p-4">
        <UserSearch searchFunction={onChangeName}/>
        <FilterBox filters={filters} setFilters={setFilters}/>
      </MoreInformation>
    </div>
  );
};

export default Timeline;
