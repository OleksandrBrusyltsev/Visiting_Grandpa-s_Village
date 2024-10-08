import { FC, useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import HouseSelector from "./HouseSelector";

interface BookingTabsProps {
  currentEvent: {
    start: Dayjs;
    end: Dayjs;
    houseName: string;
    houseId: string;
  };
}

const BookingTabs: FC<BookingTabsProps> = ({ currentEvent }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        TabIndicatorProps={{
          style: { display: "none" },
        }}
        sx={{
          minHeight: "auto",
          backgroundColor: "#B3A1891A",
          borderBottom: " 1px solid #3F5540",
        }}
        textColor="inherit"
        aria-label="booking tabs"
      >
        <Tab
          label="Загальне"
          sx={{
            border: activeTab === 0 ? "1px solid #3F5540" : "1px solid #d3d3d3",
            backgroundColor: "#B3B3B399",
            color: activeTab === 0 ? "#3F5540" : "#3F5540",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "10px",
            minHeight: "auto",
          }}
        />
        <Tab
          label="Розрахунок"
          sx={{
            border: activeTab === 1 ? "1px solid #3F5540" : "1px solid #d3d3d3",
            backgroundColor: "#B3B3B399",
            color: activeTab === 1 ? "#3F5540" : "#3F5540",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "10px",
            minHeight: "auto",
          }}
        />
      </Tabs>

      {activeTab === 0 && (
        <Box
          p={2}
          sx={{
            borderBottom: "1px solid #2E4236",
            borderRadius: "0 4px 4px 4px",
            backgroundColor: "#f7f7f7",
          }}
        >
          <HouseSelector
            currentHouse={{
              id: currentEvent.houseId,
              title: currentEvent.houseName,
            }}
          />
        </Box>
      )}

      {activeTab === 1 && (
        <Box p={2}>
          <Typography variant="body1">РОЗРАХУНОК</Typography>
        </Box>
      )}
    </Box>
  );
};

export default BookingTabs;
