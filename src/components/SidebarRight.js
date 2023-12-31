import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, SongItem } from "./";
import { setAutoPlay, setIsPlaying, setSongId } from "../features/playerSlice";
import { toast } from "react-toastify";

const SidebarRight = () => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.sidebarRight);
    const { listSongRecently } = useSelector((state) => state.songRecently);
    const { songData, isPlaying, listSong } = useSelector(
        (state) => state.player
    );
    const [playlistActive, setPlaylistActive] = useState(true);
    const [newListSong, setNewListSong] = useState(listSong);

    const handlePlaySong = (item) => {
        if (!playlistActive) {
            if (item.streamingStatus === 1) {
                setPlaylistActive(true);
                dispatch(setAutoPlay(true));
                dispatch(setSongId(item.encodeId));
            } else {
                toast.warning("Bài hát chỉ dành cho tài khoản VIP, PRI");
            }
            return null;
        }
        if (item.streamingStatus === 1) {
            dispatch(setAutoPlay(true));
            dispatch(setSongId(item.encodeId));
        } else {
            toast.warning("Bài hát chỉ dành cho tài khoản VIP, PRI");
        }
    };

    const handleClick = () => {
        if (isPlaying) {
            dispatch(setIsPlaying(false));
            return null;
        } else if (songData.streamingStatus === 1) {
            dispatch(setIsPlaying(true));
        } else {
            toast.warning("Bài hát chỉ dành cho tài khoản VIP, PRI");
        }
    };

    useEffect(() => {
        const index =
            listSong?.findIndex(
                (item) => item.encodeId === songData.encodeId
            ) || -1;
        if (index !== -1) {
            const newArr = listSong
                .slice(index)
                .concat(listSong.slice(0, index - 1));
            setNewListSong(newArr);
        }
    }, [songData]);

    const { thumbnail, title, artistsNames, encodeId, streamingStatus } =
        songData;
    return (
        <div
            className={`w-[320px] fixed transition-all duration-500 overflow-y-scroll h-screen z-[1009] bg-sbr dark:bg-sbr-dark shadow-2xl ${
                isOpen ? "right-0" : "right-[-120%]"
            }`}
        >
            <div className="w-full h-full flex flex-col">
                <div className="h-[70px] flex items-center p-2">
                    <div className="w-max rounded-full p-1 flex items-center bg-b-active dark:bg-b-active-dark">
                        <Button
                            className={`rounded-full !p-2 font-semibold transition-all ${
                                playlistActive
                                    ? "text-light bg-main dark:bg-[#6a6474]"
                                    : "hover:text-dark dark:hover:text-light"
                            }`}
                            text="text-[12px]"
                            onClick={() => setPlaylistActive(true)}
                        >
                            Danh sách phát
                        </Button>
                        <Button
                            className={`rounded-full !p-2 font-semibold transition-all ${
                                !playlistActive
                                    ? "text-light bg-main dark:bg-[#6a6474]"
                                    : "hover:text-dark dark:hover:text-light"
                            }`}
                            text="text-[12px]"
                            onClick={() => setPlaylistActive(false)}
                        >
                            Nghe gần đây
                        </Button>
                    </div>
                </div>
                <div className="w-full p-2">
                    {playlistActive && (
                        <>
                            <SongItem
                                bg="bg-b-button"
                                bgDark="bg-b-button-dark"
                                thumbnail={thumbnail}
                                title={title}
                                status={streamingStatus}
                                artists={songData.artists}
                                artistsNames={artistsNames}
                                encodeId={encodeId}
                                onClick={handleClick}
                            />
                            <div className="p-2">
                                <h2 className="font-semibold mb-2">
                                    Tiếp theo
                                </h2>
                                <p className="text-dark dark:text-main-100-dark font-meidum">
                                    Từ playlist{" "}
                                    <span className="text-main-hv dark:text-main-hv-dark">
                                        #zingchart
                                    </span>
                                </p>
                            </div>
                        </>
                    )}
                </div>

                <div className="overflow-y-scroll h-[calc(100%-150px)] w-full p-2 text-sm">
                    {playlistActive &&
                        newListSong
                            .filter(
                                (item) => item.encodeId !== songData.encodeId
                            )
                            .slice(0, 100)
                            .map((item, index) => (
                                <SongItem
                                    key={index}
                                    thumbnail={item.thumbnail}
                                    title={item.title}
                                    status={item.streamingStatus}
                                    artists={item.artists}
                                    artistsNames={item.artistsNames}
                                    encodeId={item.encodeId}
                                    onClick={() => handlePlaySong(item)}
                                />
                            ))}
                    {!playlistActive &&
                        listSongRecently.length > 0 &&
                        listSongRecently
                            .filter(
                                (item) => item.encodeId !== songData.encodeId
                            )
                            .map((item, index) => (
                                <SongItem
                                    key={index}
                                    thumbnail={item.thumbnail}
                                    title={item.title}
                                    artistsNames={item.artistsNames}
                                    encodeId={item.encodeId}
                                    onClick={() => handlePlaySong(item)}
                                />
                            ))}
                </div>
            </div>
        </div>
    );
};

export default SidebarRight;
