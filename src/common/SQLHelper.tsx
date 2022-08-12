import { openDatabase } from 'react-native-sqlite-storage';
import { ItemComicProps } from '../constants/mangaItem.type';
class SqlHelper {
    constructor() {
        this.db = openDatabase({
            name: "data.db",
            location: "default",
            createFromLocation: "~/www/data.db"
        }, () => { console.log("Open DB Success") }, (error) => { console.log(error) })
    }
    db;

    async addHistoryManga(item: ItemComicProps,name_:string) {
        this.db.transaction((tx: { executeSql: (arg0: string, arg1: string[], arg2: (txt: any, result: any) => void, arg3: (error: any) => void) => void; }) => {
            tx.executeSql("SELECT * FROM history where _id=?", [item._id], (txt, result) => {
                if (result.rows.length > 0) {
                    txt.executeSql("UPDATE history SET date_time= ? where _id = ?", [Date.now(), item._id])
                }
                else {
                    txt.executeSql('INSERT INTO history(_id,name,category, date_time) VALUES (?,?,?,?)',
                        [item._id,name_, JSON.stringify(item), Date.now()], (tx: any, results: { rowsAffected: number; }) => {
                            if (results.rowsAffected > 0) {
                                console.log('addHistoryManga Successfullys')
                            } else console.log('addHistoryManga Failed');
                        }, (error) => { console.log(error) })
                }
            }, (error) => console.log(error))
        });
    }
    // DownloadManga(item, url) {
    //     let chap: any = []
    //     chap.push(url)
    //     return new Promise((reslove, reject) => {
    //         this.db.transaction((txn) => {
    //             txn.executeSql("SELECT * FROM download_maga where _id=?", [item._id], (txt, result) => {
    //                 if (result.rows.length > 0) {
    //                     let index = JSON.parse(result.rows.raw()[0].url).findIndex((f) => f.id === url.id)
    //                     if (index != -1) {
    //                         JSON.parse(result.rows.raw()[0].url)[index].loading === true
    //                         let chapp = JSON.parse(result.rows.raw()[0].url).concat(result.rows.raw()[0].url)
    //                         txt.executeSql("UPDATE download_maga SET url= ? where _id = ?", [JSON.stringify(chapp), item._id], (tx, results) => {
    //                             if (results.rowsAffected > 0) {
    //                                 reslove(false)
    //                                 console.log('DownloadManga update Successfullys')
    //                             } else {
    //                                 reslove(true)
    //                             }
    //                         })
    //                     } else {
    //                         let chapp = JSON.parse(result.rows.raw()[0].url).concat(url)
    //                         txt.executeSql("UPDATE download_maga SET url= ? where _id = ?", [JSON.stringify(chapp), item._id], (tx, results) => {
    //                             if (results.rowsAffected > 0) {
    //                                 reslove(false)
    //                                 console.log('DownloadManga update Successfullys')
    //                             } else {
    //                                 reslove(true)
    //                             }
    //                         })
    //                     }
    //                 }
    //                 else {
    //                     txt.executeSql('INSERT INTO download_maga(_id,category,url, date_time) VALUES (?,?,?,?)',
    //                         [item._id, JSON.stringify(item), JSON.stringify(chap), Date.now()], (tx: any, results: { rowsAffected: number; }) => {
    //                             if (results.rowsAffected > 0) {
    //                                 console.log('DownloadManga Successfullys')
    //                                 reslove(false)
    //                             } else reslove(true)
    //                         })
    //                 }
    //             }, (error) => console.log(error))

    //         }, (error: any) => { console.log(error) })
    //     })
    // }
    DownloadManga(itemManga: string, item: any, statusDown) {
        return new Promise((reslove, reject) => {
            this.db.transaction((txn) => {
                txn.executeSql("SELECT * FROM download_maga where idManga=?", [item.idManga], (txt, result) => {
                    if (result.rows.length > 0) {
                        if (statusDown === 0) {
                            txt.executeSql('INSERT INTO dowload_maga_chapter(idManga,idchap,nameChap, status,data,number) VALUES (?,?,?,?,?,?)',
                                [item.idManga, item.idChap, item.nameChap, item.status, JSON.stringify(item.data), item.number], (tx: any, results: { rowsAffected: number; }) => {
                                    if (results.rowsAffected > 0) {
                                        console.log('DownloadManga Chap Successfully')
                                        reslove(false)
                                    } else reslove(true)
                                })
                        } else {
                            txt.executeSql("UPDATE dowload_maga_chapter SET status= ?, data = ? where idManga = ? and idchap = ?", [item.status, JSON.stringify(item.data), item.idManga, item.idChap], (tx, results) => {
                                if (results.rowsAffected > 0) {
                                    reslove(false)
                                    console.log('DownloadManga update Chap Successfullys')
                                } else {
                                    reslove(true)
                                }
                            })
                        }
                    } else {
                        txt.executeSql('INSERT INTO download_maga(idManga,itemManga,date_time, numberChap) VALUES (?,?,?,?)',
                            [item.idManga, JSON.stringify(itemManga), Date.now(), item.numberChap], (tx: any, results: { rowsAffected: number; }) => {
                                if (results.rowsAffected > 0) {
                                    console.log('DownloadManga Successfullys')
                                    reslove(false)
                                } else reslove(true)
                            })
                        txt.executeSql('INSERT INTO dowload_maga_chapter(idManga,idchap,nameChap, status,data,number) VALUES (?,?,?,?,?,?)',
                            [item.idManga, item.idChap, item.nameChap, item.status, JSON.stringify(item.data), item.number,], (tx: any, results: { rowsAffected: number; }) => {
                                if (results.rowsAffected > 0) {
                                    console.log('DownloadManga Chap Successfully')
                                    reslove(false)
                                } else reslove(true)
                            })
                    }
                }, (error: any) => reject(error))
            }, (error: any) => { reject(error) })
        })
    }
    DeleteChapDownloadManga(idManga: string, idChap: string) {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql("DELETE FROM dowload_maga_chapter WHERE idManga= ? and idChap =?", [idManga, idChap], (txs, result) => {
                    reslove(result.rows.raw());
                    console.log('DELETE chap Successfully ')
                }, (error: any) => { reject(error) })
            })
        })
    }
   
    getDowloadManga(idManga) {
        // return new Promise((reslove, reject) => {
        //     this.db.transaction((txn) => {
        //         txn.executeSql(
        //             'SELECT * FROM history  ORDER  BY date_time DESC LIMIT ? OFFSET ?',
        //             [numberItem, (page - 1) * numberItem],
        //             (_: any, results: { rows: { raw: () => unknown; }; }) => {
        //                 reslove(results.rows.raw())
        //             }
        //         );
        //     }, (error: any) => { reject(error) })
        // })
    }
    GetListDowload(page = 1, numberItem = 12) {
        return new Promise((reslove, reject) => {
            this.db.transaction((txn) => {
                txn.executeSql(
                    'SELECT * FROM download_maga  ORDER  BY date_time DESC LIMIT ? OFFSET ?',
                    [numberItem, (page - 1) * numberItem],
                    (_: any, results: { rows: { raw: () => unknown; }; }) => {
                        reslove(results.rows.raw())
                    }
                );
            }, (error: any) => { reject(error) })
        })
    }
    GetListChapterByMangaDowload_(idManga: string) {
        return new Promise((reslove, reject) => {
            this.db.transaction((txn) => {
                txn.executeSql(
                    'SELECT * FROM dowload_maga_chapter where idManga =?  ORDER  BY number ASC',
                    [idManga],
                    (_: any, results: { rows: { raw: () => unknown; }; }) => {
                        reslove(results.rows.raw())
                    }
                );
            }, (error: any) => { reject(error) })
        })
    }
    GetListChapterByMangaDowload(page = 1, numberItem = 12, idManga: string) {
        return new Promise((reslove, reject) => {
            this.db.transaction((txn) => {
                txn.executeSql(
                    'SELECT * FROM dowload_maga_chapter where idManga =?  ORDER  BY number ASC LIMIT ? OFFSET ?',
                    [idManga, numberItem, (page - 1) * numberItem],
                    (_: any, results: { rows: { raw: () => unknown; }; }) => {
                        reslove(results.rows.raw())
                    }
                );
            }, (error: any) => { reject(error) })
        })
    }
    DeleteDownManga(idManga: string) {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql("DELETE FROM download_maga WHERE idManga= ?", [idManga], (txs, result) => {
                    reslove(result.rows.raw());
                    console.log('DELETE Successfully ')
                }, (error: any) => { reject(error) })
                tx.executeSql("DELETE FROM dowload_maga_chapter WHERE idManga= ? ", [idManga], (txs, result) => {
                    reslove(result.rows.raw());
                    console.log('DELETE dowload_maga_chapter Successfully ')
                }, (error: any) => { reject(error) })
            })
        })
    }
    DeleteMangaHistory(id: string) {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql("DELETE FROM history WHERE _id= ?", [id], (txs, result) => {
                    reslove(result.rows.raw());
                    console.log('DELETE Successfully ')
                }, (error: any) => { reject(error) })
            })
        })
    }
    getMangaByName(txt:string,nameTable) {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(`SELECT * FROM ${nameTable} DESC WHERE name LIKE ? `, [`%${txt}%`], (txs, result) => {
                    reslove(result.rows.raw());
                 
                }, (error: any) => { reject(error) })
            })
        })
    }
    addFollowManga(item: ItemComicProps,name_:string) {
        this.db.transaction((tx: { executeSql: (arg0: string, arg1: string[], arg2: (txt: any, result: any) => void, arg3: (error: any) => void) => void; }) => {
            tx.executeSql("SELECT * FROM manga_follow where _id=?", [item._id], (txt, result) => {
                if (result.rows.length > 0) {
                    txt.executeSql("UPDATE manga_follow SET date_time= ? where manga_id = ?",
                        [item._id, Date.now()], (tx, results) => {
                            if (results.rowsAffected > 0) {
                                console.log('addFollowManga Successfully')
                            } else console.log('addFollowManga Failed');
                        })
                }
                else {
                    txt.executeSql(`INSERT INTO manga_follow (_id,name,category, date_time) VALUES (?,?,?,?)`, [item._id,name_, JSON.stringify(item), Date.now()], (tx, results) => {
                        if (results.rowsAffected > 0) {
                            console.log('addFollowManga Successfully')
                        } else console.log('addFollowManga Failed');
                    })
                }
            }, (error) => console.log(error))
        });
    }

    unFollowManga(id: string) {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql("DELETE FROM manga_follow WHERE _id= ?", [id], (txs, result) => {
                    reslove(result.rows.raw());
                    console.log('DELETE Successfully ')
                }, (error: any) => { reject(error) })
            })
        })
    }
    DeleteAllFollowManga() {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql("DELETE FROM manga_follow", [], (txs, result) => {
                    reslove(result.rows.raw());
                    console.log('DELETE Successfully ')
                }, (error: any) => { reject(error) })
            })
        })
    }
    DeleteAllHistoryManga() {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql("DELETE FROM history", [], (txs, result) => {
                    reslove(result.rows.raw());
                    console.log('DELETE Successfully ')
                }, (error: any) => { reject(error) })
            })
        })
    }
    DeleteAllDownloadManga() {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql("DELETE FROM download_maga", [], (txs, result) => {
                    reslove(result.rows.raw());
                    console.log('DELETE Successfully ')
                }, (error: any) => { reject(error) })
            })
        })
    }
    GetListHistory(page = 1, numberItem = 12) {

        return new Promise((reslove, reject) => {
            this.db.transaction((txn) => {
                txn.executeSql(
                    'SELECT * FROM history  ORDER  BY date_time DESC LIMIT ? OFFSET ?',
                    [numberItem, (page - 1) * numberItem],
                    (_: any, results: { rows: { raw: () => unknown; }; }) => {
                        reslove(results.rows.raw())
                    }
                );
            }, (error: any) => { reject(error) })
        })
    }

    GetListFollower(page = 1, numberItem = 12) {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx: { executeSql: (arg0: string, arg1: number[], arg2: (txs: any, result: { rows: { raw: () => unknown; }; }) => void, arg3: (error: any) => void) => void; }) => {
                tx.executeSql("SELECT * FROM manga_follow ORDER  BY date_time DESC LIMIT ? OFFSET ?",
                    [numberItem, (page - 1) * numberItem],
                    (txs: any, result: { rows: { raw: () => unknown; }; }) => {
                        reslove(result.rows.raw());
                    }, (error) => { reject(error) })
            })
        })
    }
    getFollowManga(item) {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql("SELECT * FROM manga_follow where _id =? ", [item._id], (txs, result) => {
                    reslove(result.rows.raw());
                }, (error) => { reject(error) })
            })
        })
    }



    async addSearchManga(txt_: string) {
        this.db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO search(text, date_time) VALUES (?,?)',
                [txt_, Date.now()],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        console.log('addSearchManga Successfully')
                    } else console.log('addSearchManga Failed');
                }
            );
        }, (error: any) => { console.log(error) });
    }

    GetListSearch() {

        return new Promise((reslove, reject) => {
            this.db.transaction((txn) => {
                txn.executeSql(
                    'SELECT * FROM search ORDER  BY date_time DESC',
                    [],
                    (_: any, results: { rows: { raw: () => unknown; }; }) => {
                        reslove(results.rows.raw())
                    }
                );
            }, (error: any) => { reject(error) })
        })
    }

    DeleteManga() {
        return new Promise((reslove, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql("DELETE FROM search", [], (txs: any, result: any) => {
                    // reslove(result.rows.raw());
                    console.log('DELETE Successfully ')
                }, (error: any) => { reject(error) })
            })
        })
    }
    addhistoryMangaChapter(manga_id, chapter_id, chapter_name, index_) {
        this.db.transaction((tx: { executeSql: (arg0: string, arg1: string[], arg2: (txt: any, result: any) => void, arg3: (error: any) => void) => void; }) => {
            tx.executeSql(
              'SELECT * FROM history_manga_chapter where chapter_id=?',
              [chapter_id],
              (txt, result) => {
                if (result.rows.length > 0) {
                    txt.executeSql(
                      'UPDATE history_manga_chapter date=? where chapter_id = ?',
                      [Date.now(),chapter_id],
                      (tx, results) => {
                        if (results.rowsAffected > 0) {
                          console.log(
                            'history_manga_chapter Successfully update',
                          );
                        } else
                          console.log('history_manga_chapter Failed update');
                      },
                    );
                }
                else {
                    txt.executeSql(`INSERT INTO history_manga_chapter(manga_id, chapter_id,chapter_name, date,number) VALUES (?,?,?,?,?)`, [manga_id, chapter_id, chapter_name, Date.now(), index_], (tx, results) => {
                        if (results.rowsAffected > 0) {
                            console.log('history_manga_chapter Successfully')
                        } else console.log('history_manga_chapter Failed');
                    })
                }
              },
              (error) => console.log(error),
            );
        });
    }


    getaddhistoryMangaChapter(manga_id) {
        return new Promise((reslove, reject) => {
            this.db.transaction((txn) => {
                txn.executeSql(
                    'SELECT * FROM history_manga_chapter where manga_id=? ',
                    [manga_id],
                    (_: any, results: { rows: { raw: () => unknown; }; }) => {
                        reslove(results.rows.raw())
                    }
                );
            }, (error: any) => { reject(error) })
        })
    }

    deletehistoryMangaChapter() {
        return new Promise((reslove, reject) => {
            this.db.transaction((txn) => {
                txn.executeSql(
                    'DELETE FROM history_manga_chapter',
                    [],
                    (_: any, results: { rows: { raw: () => unknown; }; }) => {
                        console.log('DELETE success')
                        reslove(true)
                    }
                );
            }, (error: any) => { reject(error) })
        })
    }
}
export default new SqlHelper();