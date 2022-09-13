// Import All needed dependencies
import React, { useEffect } from 'react'
import swal from 'sweetalert'
import { useForm } from "react-hook-form";
import { FormControl } from 'upkit';

// Import API Delivery Address
import { createAddress } from '../../../app/api/address';

// Import Component
import SelectWilayah from './SelectWilayah';

// Import Validation Rules
import { rules } from "./Validation";

// Address Form receives props from address
const AddressForm = ({setShowForm, isFormNotShowing}) => {
    // Hooks for managing form 
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues,
      } = useForm();
      const allFields = watch();
      const updateValue = (field, value) => setValue(field, value, { shouldValidate: true, shouldDirty: true });
    
    // If click button submit of Add Address form
    const onSubmit = async (formData) => {
        let payload = {
          nama: formData.nama,
          detail: formData.detail,
          provinsi: formData.provinsi.label,
          kabupaten: formData.kabupaten.label,
          kecamatan: formData.kecamatan.label,
          kelurahan: formData.kelurahan.label,
        };
        const { data } = await createAddress(payload);
        if (data.error) return;
        if (!data.error) {
            setShowForm(false);
            isFormNotShowing(true);
            swal("New Address Added!", "", "success");
        }
      };

    //  Each field is selected, this effect called
    // choosing provinsi
    // kabupaten, kecamatan and kelurahan get disabled
    useEffect(() => {
        setValue("kabupaten", null);
        setValue("kecamatan", null);
        setValue("kelurahan", null);
    }, [allFields.provinsi, setValue]); 
    // choosing kabupaten
    // kecamatan and kelurahan get disabled
    useEffect(() => {
        setValue("kecamatan", null);
        setValue("kelurahan", null);
    }, [allFields.kabupaten, setValue]);
    // choosing kecamatan
    // kelurahan get disabled
    useEffect(() => {
        setValue("kelurahan", null);
    }, [allFields.kecamatan, setValue]);
    
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className='bg-[#149BFC] w-[68rem] ml-4'>
            <div className='flex ml-10 pt-5'>
                <div className='h-12 mt-2 w-[6rem] bg-white mr-20 p-3'>
                  <p className='font-bold'>Nama</p>
                </div>
                <FormControl errorMessage={errors.nama?.message}>
                    <input {...register('nama', rules.nama)} type="text" className='w-[50rem] bg-white p-3'  />
                </FormControl>
            </div>
            <div className='flex ml-10 py-5'>
            <div className='mr-14'>
                <div className='w-[10rem] bg-white mr-20 p-3 mb-3'>
                    <p className='font-bold'>Detail Alamat</p>
                </div>
                <FormControl errorMessage={errors.detail?.message}>
                <textarea {...register("detail", rules.detail)} style={{resize: 'none'}} cols="65" rows="14"></textarea>
                </FormControl>
            </div>
            <div>
                <div>
                    <div className='w-[6rem] bg-white mr-20 p-2 mb-3'>
                        <p>Provinsi</p>
                    </div>
                    <FormControl errorMessage={errors.provinsi?.message}>
                    <SelectWilayah 
                        onChange={(option) => updateValue("provinsi", option)}
                        value={getValues().provinsi}
                    />
                    </FormControl>
                </div>
                <div>
                    <div className='w-[6rem] bg-white mr-20 p-2 mb-3'>
                        <p>Kabupaten</p>
                    </div>
                    <FormControl errorMessage={errors.kabupaten?.message}>
                    <SelectWilayah 
                        tingkat="kabupaten"
                        kodeInduk={getValues().provinsi?.value}
                        onChange={(option) => updateValue("kabupaten", option)}
                        value={getValues().kabupaten}
                    />
                    </FormControl>
                </div>
                <div>
                    <div className='w-[6rem] bg-white mr-20 p-2 mb-3'>
                        <p>Kecamatan</p>
                    </div>
                    <FormControl errorMessage={errors.kecamatan?.message}>
                    <SelectWilayah 
                        tingkat="kecamatan"
                        kodeInduk={getValues().kabupaten?.value}
                        onChange={(option) => updateValue("kecamatan", option)}
                        value={getValues().kecamatan}
                    />
                    </FormControl>
                </div>
                <div>
                    <div className='w-[6rem] bg-white mr-20 p-2 mb-3'>
                        <p>Kelurahan</p>
                    </div>
                    <FormControl errorMessage={errors.kelurahan?.message}>
                    <SelectWilayah
                        tingkat="kelurahan"
                        kodeInduk={getValues().kecamatan?.value}
                        onChange={(option) => updateValue("kelurahan", option)}
                        value={getValues().kelurahan}
                    />
                    </FormControl>
                </div>
                <button type="submit" className="float-right w-[8rem] focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 mb-2 rounded">Simpan</button>
            </div>
            </div>
        </div>
    </form>
  )
}

export default AddressForm