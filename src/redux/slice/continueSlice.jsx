import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
export const continueData=createAsyncThunk('continueData',async()=>{
    const response= await fetch('https://api.themoviedb.org/3/movie/popular?api_key=20ac0341ec5b2096d68f9c473d7b5d69')
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