'use strict';

import { DisplayObject, TextField } from "black-engine";
import { LifeComponent } from "../components/LifeComponent";
import { ShootComponent } from "../components/ShootComponent";
import { Lives } from "./Lives";

const HUD_COLOR = 0xff006f;
const HUD_FONT = 'Arial';
const HUD_FONT_SIZE = 24;
const HUD_MARGIN = 25;

export class HUD extends DisplayObject {
    constructor() {
        super();
        this.state = {};
    }

    visitPlayer(player) {
        const lifeComponent = player.getComponent(LifeComponent);

        if (!this.state.hasOwnProperty('player')) {
            this.state.player = {
                score: new TextField('Score: ', HUD_FONT, HUD_COLOR, HUD_FONT_SIZE),
                lives: new Lives(lifeComponent.lives, HUD_COLOR),
            }

            this.state.player.lives.x = this.stage.bounds.x + HUD_MARGIN;
            this.state.player.lives.y = this.stage.bounds.y + HUD_MARGIN;

            this.state.player.score.x = this.stage.bounds.x + HUD_MARGIN;
            this.state.player.score.y = this.stage.bounds.y + HUD_MARGIN * 3;

            this.add(this.state.player.score);
            this.add(this.state.player.lives);
        }

        const state = this.state.player;

        state.score.text = 'Score: ' + player.score;
        state.lives.lives = lifeComponent.lives;

    }
}