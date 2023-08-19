import packageJSON from '../../package.json'

const findGetParameter = parameterName => {
    let result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) 
                result = decodeURIComponent(tmp[1]);
        });
    return result;
}

const resources = `${packageJSON.usercontent}/src/Resources`,
    resourceUrl = `${findGetParameter('resources') || 'https://s.eu.tankionline.com'}`;

export default {
    maps: {
        berlin: {
            from: `${resourceUrl}/0/114/120/67/30023211007774`,
            to: [
                `${resources}/maps/berlin/atlas.webp`,
                `${resources}/maps/berlin/atlas2.webp`,
                `${resources}/maps/berlin/atlas3.webp`
            ]
        },
        chernobyl: {
            from: `${resourceUrl}/0/114/132/50/30023221517011`,
            to: [
                `${resources}/maps/chernobyl/atlas.webp`,
                `${resources}/maps/chernobyl/atlas2.webp`
            ]
        },
        silence: {
            from: `${resourceUrl}/0/114/147/102/30125767471417`,
            to: [
                `${resources}/maps/silence/atlas.webp`,
                `${resources}/maps/silence/atlas2.webp`
            ]
        },
        island: {
            from: `${resourceUrl}/0/114/140/74/30023252200472`,
            to: [
                `${resources}/maps/island/atlas.webp`
            ]
        },
        shortbridge: {
            from: `${resourceUrl}/0/114/124/253/30023351102570`,
            to: [
                `${resources}/maps/short-bridge/atlas.webp`
            ]
        },
        highland: {
            from: `${resourceUrl}/0/114/140/75/30023245012560`,
            to: [
                `${resources}/maps/highland/atlas.webp`
            ]
        },
        serpuhov_mm: {
            from: `${resourceUrl}/0/16723/203/66/30125767471414`,
            to: [
                `${resources}/maps/matchmaking/serpuhov/atlas.webp`,
                `${resources}/maps/matchmaking/serpuhov/atlas2.webp`
            ]
        },
        serpuhov: {
            from: `${resourceUrl}/0/114/124/176/30023347020365`,
            to: [
                `${resources}/maps/serpuhov/atlas.webp`,
                `${resources}/maps/serpuhov/atlas2.webp`
            ]
        },
        sandbox: {
            from: `${resourceUrl}/0/1/305/27/30026243132232`,
            to: [
                `${resources}/maps/sandbox/atlas.webp`
            ]
        },
        aleksandrovsk_mm: {
            from: `${resourceUrl}/0/16723/200/110/30023263050005`,
            to: [
                `${resources}/maps/matchmaking/aleksandrovsk/atlas.webp`
            ]
        },
        barda_mm: {
            from: `${resourceUrl}/0/16723/177/344/30023264124307`,
            to: [
                `${resources}/maps/matchmaking/barda/atlas.webp`,
                `${resources}/maps/matchmaking/barda/atlas2.webp`
            ]
        },
        berlin_mm: {
            from: `${resourceUrl}/567/105624/267/135/30023265152365`,
            to: [
                `${resources}/maps/matchmaking/berlin/atlas.webp`,
                `${resources}/maps/matchmaking/berlin/atlas2.webp`,
                `${resources}/maps/matchmaking/berlin/atlas3.webp`
            ]
        },
        bobruysk_mm: {
            from: `${resourceUrl}/545/151421/10/111/30023266235420`,
            to: [
                `${resources}/maps/matchmaking/bobruysk/atlas.webp`,
            ]
        },
        boynya_mm: {
            from: `${resourceUrl}/0/16723/205/216/30040001474064`,
            to: [
                `${resources}/maps/matchmaking/boynya/atlas.webp`,
            ]
        },
    },
    buildings: {
        nubu_1: `${resources}/buildings/nubu_1.3ds`,
        nubu_2: `${resources}/buildings/nubu_2.3ds`,
        nubu_3: `${resources}/buildings/nubu_3.3ds`,
        nubu_4: `${resources}/buildings/nubu_4.3ds`,
        nubu_5: `${resources}/buildings/nubu_5.3ds`,
        nubu_6: `${resources}/buildings/nubu_6.3ds`,
        nubu_7: `${resources}/buildings/nubu_7.3ds`,
        nubu_8: `${resources}/buildings/nubu_8.3ds`,
        nubu_9: `${resources}/buildings/nubu_9.3ds`,
        nubu_10: `${resources}/buildings/nubu_10.3ds`,
        nubu_12: `${resources}/buildings/nubu_12.3ds`,
        nubu_14: `${resources}/buildings/nubu_14.3ds`,
        smhouse2: `${resources}/buildings/smhouse2.3ds`,
        smhouse3: `${resources}/buildings/smhouse3.3ds`,
        smhouse5: `${resources}/buildings/smhouse5.3ds`,
        tower: `${resources}/buildings/tower.3ds`,
        watch_to: `${resources}/buildings/watch_to.3ds`,
    },
    elements: {
        bilboard: `${resources}/elements/bilboard.3ds`,
        ow_t: `${resources}/elements/ow_t.3ds`
    },
    landscape: {
        cliff_0: `${resources}/landscape/cliff_0.3ds`,
        cliff_1: `${resources}/landscape/cliff_1.3ds`,
        cliff_2: `${resources}/landscape/cliff_2.3ds`,
        cliff_4: `${resources}/landscape/cliff_4.3ds`,
        cliff_c2: `${resources}/landscape/cliff_c2.3ds`,
        cliff_cor: `${resources}/landscape/cliff_cor.3ds`,
        cliff_r2: `${resources}/landscape/cliff_r2.3ds`,
        cliff_ri: `${resources}/landscape/cliff_ri.3ds`,
        rise_2: `${resources}/landscape/rise_2.3ds`,
        rise_3: `${resources}/landscape/rise_3.3ds`,
        rise_5: `${resources}/landscape/rise_5.3ds`,
        slope_1: `${resources}/landscape/slope_1.3ds`,
        slope_2: `${resources}/landscape/slope_2.3ds`,
        wall_3w: `${resources}/landscape/wall_3w.3ds`,
        wall_cr: `${resources}/landscape/wall_cr.3ds`,
        wall_e1: `${resources}/landscape/wall_e1.3ds`,
        wall_e2: `${resources}/landscape/wall_e2.3ds`,
        wall_e3: `${resources}/landscape/wall_e3.3ds`,
        wall_st: `${resources}/landscape/wall_st.3ds`
    },
    props: {
        brid_1: `${resources}/props/brid_1.3ds`,
        brid_2: `${resources}/props/brid_2.3ds`,
        brid_3: `${resources}/props/brid_3.3ds`,
        brid_4: `${resources}/props/brid_4.3ds`,
        brid_5: `${resources}/props/brid_5.3ds`,
        brid_6: `${resources}/props/brid_6.3ds`,
        brid_7: `${resources}/props/brid_7.3ds`,
        fab_tow: `${resources}/props/fab_tow.3ds`,
        fab_tow2: `${resources}/props/fab_tow2.3ds`,
        st_br01: `${resources}/props/st_br01.3ds`,
        tube_1: `${resources}/props/tube_1.3ds`,
        tube_2: `${resources}/props/tube_2.3ds`,
        tube_3: `${resources}/props/tube_3.3ds`,
        tube_4: `${resources}/props/tube_4.3ds`,
        tunnel_1: `${resources}/props/tunnel_1.3ds`,
        tunnel_2: `${resources}/props/tunnel_2.3ds`,
        vilhou_1: `${resources}/props/vilhou_1.3ds`,
        vilhou_2: `${resources}/props/vilhou_2.3ds`,
        vilhou_3: `${resources}/props/vilhou_3.3ds`,
        vilhou_4: `${resources}/props/vilhou_4.3ds`,
        wall_1: `${resources}/props/wall_1.3ds`,
        wall_2: `${resources}/props/wall_2.3ds`,
        wall_3: `${resources}/props/wall_3.3ds`,
        wallcorn: `${resources}/props/wallcorn.3ds`,
        wgates: `${resources}/props/wgates.3ds`
    },
    /* Несовместимо
    castle: {
        castle: `${resources}/castle/castle.3ds`,
        fahwerk1: `${resources}/castle/fahwerk1.3ds`,
        fahwerk2: `${resources}/castle/fahwerk2.3ds`,
        tower_corner: `${resources}/castle/tower_corner.3ds`,
        tower_end: `${resources}/castle/tower_end.3ds`,
        tower_roof: `${resources}/castle/tower_roof.3ds`,
        tower_str: `${resources}/castle/tower_str.3ds`,
        wall: `${resources}/castle/wall.3ds`,
        wall_broken_1: `${resources}/castle/wall_broken_1.3ds`,
        wall_broken_2: `${resources}/castle/wall_broken_2.3ds`,
        wall_cor_in: `${resources}/castle/wall_cor_in.3ds`,
        wall_cor_out: `${resources}/castle/wall_cor_out.3ds`,
        wall_end_1: `${resources}/castle/wall_end_1.3ds`,
        wall_end_2: `${resources}/castle/wall_end_2.3ds`,
        wall_gate: `${resources}/castle/wall_gate.3ds`,
        wall_short: `${resources}/castle/wall_short.3ds`
    },*/
    hulls: {
        viking: {
            from: [
                `${resourceUrl}/574/35274/263/164/30023200247021/`,
                `${resourceUrl}/571/121215/5/23/30023200213042/`
            ],
            to: `${resourceUrl}/545/14403/373/22/30023200300655/`
        },
        hornet: {
            from: [
                `${resourceUrl}/570/57730/367/11/30023203102622/`,
                `${resourceUrl}/566/70102/323/346/30023203020264/`
            ],
            to: `${resourceUrl}/551/32007/310/225/30023202734413/`
        },
        wasp: {
            from: [
                `${resourceUrl}/574/111243/33/322/30023177504446/`,
                `${resourceUrl}/574/111503/270/327/30023177541167/`
            ],
            to: `${resourceUrl}/577/171773/42/62/30023200017606/`
        },
        mammoth: {
            from: [
                `${resourceUrl}/600/67466/142/361/30023202021765/`,
                `${resourceUrl}/600/67314/131/54/30023201710460/`
            ],
            to: `${resourceUrl}/557/31354/323/254/30023201357637/`
        },
        hunter: {
            from: [
                `${resourceUrl}/574/35434/246/315/30023202224766/`,
                `${resourceUrl}/567/166366/55/140/30023202201065/`
            ],
            to: `${resourceUrl}/577/157453/256/241/30026213334751/`
        },
        dictator: {
            from: [
                `${resourceUrl}/602/61700/245/112/30235366242214/`,
                `${resourceUrl}/602/61700/245/106/30234661241174/`
            ],
            to: `${resourceUrl}/600/170471/174/17/30036510257377/`
        },
        titan: {
            from: [
                `${resourceUrl}/606/22645/10/357/30304662376161/`,
                `${resourceUrl}/606/22645/11/165/30305415124610/`
            ],
            to: `${resourceUrl}/601/166273/204/222/30075460130225/`
        }
    },
    turrets: {
        freeze: {
            from: [
                `${resourceUrl}/575/153310/123/250/30023174205326/`
            ],
            to: `${resourceUrl}/605/14613/143/127/30263310463254/`
        },
        firebird: {
            from: [
                `${resourceUrl}/573/113511/153/127/30023176270052/`,
                `${resourceUrl}/573/113511/153/137/30023176245450/`
            ],
            to: `${resourceUrl}/606/154706/226/46/30333162052774/`
        },
        isida: {
            from: [
                `${resourceUrl}/605/12650/334/263/30245230366040/`,
                `${resourceUrl}/605/12650/335/30/30245215204100/`
            ],
            to: `${resourceUrl}/606/155040/263/253/30333215031450/`
        },
        hammer: { // cringe
            from: [
                `${resourceUrl}/0/16721/371/335/30023173441663/`,
                `${resourceUrl}/611/147301/37/102/30471670145142/`,
                `${resourceUrl}/611/147301/37/333/30471670013665/`
            ],
            to: `${resourceUrl}/601/166273/204/221/30075460266641/`
        },
        tesla: { // cringe
            from: [
                `${resourceUrl}/574/136476/202/234/30051053324235/`,
                `${resourceUrl}/567/20040/100/57/30051053300260/`
            ],
            to: `${resourceUrl}/604/60235/244/25/30214065350140/`
        },
        thunder: {
            from: [
                `${resourceUrl}/601/105644/16/116/30061351244740/`,
                `${resourceUrl}/601/105644/16/124/30061351151076/`
            ],
            to: `${resourceUrl}/545/14356/174/306/30023170363634/`
        },
        smoky: {
            from: [
                `${resourceUrl}/566/114246/64/4/30023171212561/`,
                `${resourceUrl}/570/54763/200/13/30125767471374/`
            ],
            to: `${resourceUrl}/577/171773/42/54/30023171376721/`
        },
        twins: {
            from: [
                `${resourceUrl}/575/4122/336/247/30023167112521/`,
                `${resourceUrl}/577/157371/340/255/30023170074056/`
            ],
            to: `${resourceUrl}/577/157371/340/255/30023170074056/`
        },
        ricochet: {
            from: [
                `${resourceUrl}/603/150223/342/330/30172073000052/`,
                `${resourceUrl}/603/121326/210/264/30172073014752/`
            ],
            to: `${resourceUrl}/556/131232/204/234/30023172205275/`
        },
        railgun: {
            from: [
                `${resourceUrl}/573/162033/227/133/30023172677526/`,
                `${resourceUrl}/567/105205/202/122/30023172660107/`
            ],
            to: `${resourceUrl}/550/121443/145/146/30023166764662/`
        },
        shaft: {
            from: [
                `${resourceUrl}/0/114/160/315/30023171751136/`,
            ],
            to: `${resourceUrl}/600/170471/174/26/30036116357254/`
        }
    }
}