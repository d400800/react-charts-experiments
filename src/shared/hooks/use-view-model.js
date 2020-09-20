import {useState} from "react";

export default function useViewModel(initialViewModelState) {
    const [viewModel] = useState(initialViewModelState);

    return viewModel;
}