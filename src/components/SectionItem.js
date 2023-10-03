import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Image, ThirdHeading } from "./";
import { setIsAddRecentyly } from "../features/playlistRecentlySlice";

const SectionItem = ({ data, artists, hAlbum }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickPlaySong = () => {
        console.log("data", data);
        dispatch(setIsAddRecentyly(true));
        navigate(data?.link.split(".")[0]);
    };

    const listArtists = data?.artists?.map((item) => item.name).join(",");
    return (
        <div className="w-full flex flex-col gap-2">
            <Image data={data} onClick={handleClickPlaySong} size={40} />
            {artists ? (
                <ThirdHeading
                    title={data?.sortDescription || data?.title}
                    description={listArtists}
                    height="h-10"
                    artists={data?.artists}
                    onClick={handleClickPlaySong}
                />
            ) : hAlbum ? (
                <ThirdHeading
                    description={data?.sortDescription || data?.artistsNames}
                    title={data?.title}
                    artists={data?.artists}
                    onClick={handleClickPlaySong}
                />
            ) : (
                <ThirdHeading description={data?.sortDescription} />
            )}
        </div>
    );
};

export default SectionItem;
