// Import All needed dependencies
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Select } from "upkit";

// SelectWilayah gets props from address form
export default function SelectWilayah({ tingkat, kodeInduk, onChange, value }) {
  // State
  const [data, setData] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);

  // Each params of url endpoint change, this effect will trigger
  React.useEffect(() => {
    setIsFetching(true);
    axios
      .get(
        `http://regions-indoneisa.herokuapp.com/api/${tingkat}?kode_induk=${kodeInduk}`
      )
      .then(({ data }) => setData(data))
      .finally((_) => setIsFetching(false));
  }, [kodeInduk, tingkat]);

  return (
    <div className="w-[27rem]">
        <Select
          options={data.map((wilayah) => ({
            label: wilayah.nama,
            value: wilayah.kode,
          }))}
          onChange={onChange}
          value={value}
          isLoading={isFetching}
          isDisabled={isFetching || !data.length}
        />
    </div>
  );
}

// Prop Types of select wilayah
SelectWilayah.propTypes = {
  tingkat: PropTypes.oneOf(["provinsi", "kabupaten", "kecamatan", "kelurahan"]),
  kodeInduk: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

// Prop Types of select wilayah
SelectWilayah.defaultProps = {
  tingkat: "provinsi",
};
