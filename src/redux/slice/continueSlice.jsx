import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
export const continueData=createAsyncThunk('continueData',async()=>{
    const response= await fetch('http://localhost:8080/api/movies')
    return await response.json();
})

const continueSlice=createSlice({
    name:'continue',
    initialState:{
        isLoading:false,
        data:null,
        isError:false,
    },
    extraReducers:(builder)=>{
        builder.addCase(continueData.pending,(state,action)=>{
            state.isLoading=true;
            action;
        })
        builder.addCase(continueData.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;

        })
        builder.addCase(continueData.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            console.log("Error",action.payload);
        })
    }

})

export default continueSlice.reducer;