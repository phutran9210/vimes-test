import React, { useEffect, useState } from "react";
import { Select } from "antd";

import debounce from "lodash/debounce";
import { searchProductName } from "../../../service/requestApi/admin";

interface Product {
  product_id_name: string;
  product_name: string;
}

interface InputProductIdProps {
  onProductNameChange?: (productInfo: any) => void;
}

const SearchInput: React.FC<{
  placeholder: string;
  style: React.CSSProperties;
  onSelect: (product: Product) => void;
}> = ({ placeholder, style, onSelect }) => {
  const [data, setData] = useState<Product[]>([]);
  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (!value) return;

    const getProductName = async () => {
      const response = await searchProductName(value);
      if (response.data.status === 200) {
        setData(response.data.result);
      }
    };
    getProductName();
  }, [value]);

  const debouncedOnChange = debounce((value: string) => {
    setValue(value);
  }, 500);

  const handleSearch = (newValue: string) => {
    debouncedOnChange(newValue);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    const selectedProduct = data.find((d) => d.product_id_name === newValue);
    console.log(selectedProduct);

    if (selectedProduct) {
      onSelect(selectedProduct);
    }
  };

  return (
    <Select
      showSearch
      value={value}
      placeholder={placeholder}
      style={style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={data.map((d) => ({
        value: d.product_id_name,
        label: d.product_id_name,
      }))}
    />
  );
};

const InputProductId: React.FC<InputProductIdProps> = ({
  onProductNameChange,
}) => {
  const handleProductSelect = (product: Product) => {
    if (onProductNameChange) {
      onProductNameChange(product);
    }
  };

  return (
    <SearchInput
      placeholder="Nhập mã số sản phẩm"
      style={{ width: "80%" }}
      onSelect={handleProductSelect}
    />
  );
};

export default InputProductId;
