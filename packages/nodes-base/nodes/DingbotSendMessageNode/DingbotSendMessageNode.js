"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DingbotSendMessageNode = void 0;
const ts_dingtalk_robot_1 = require("ts-dingtalk-robot");
const metadata = __importStar(require("./metadata"));
class DingbotSendMessageNode {
    constructor() {
        this.description = metadata.description;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = this.getInputData();
            if (items.length > 0) {
                const messages = items.map((item, i) => {
                    const messageType = this.getNodeParameter('messageType', i);
                    let message;
                    switch (messageType) {
                        case 'text':
                            const text = new ts_dingtalk_robot_1.Text(this.getNodeParameter('textContent', i));
                            message = text;
                            break;
                        case 'link':
                            const link = new ts_dingtalk_robot_1.Link(this.getNodeParameter('textContent', i));
                            link.setTitle(this.getNodeParameter('title', i));
                            link.setImage(this.getNodeParameter('linkImageURL', i));
                            link.setUrl(this.getNodeParameter('linkURL', i));
                            message = link;
                            break;
                        case 'markdown':
                            const markdown = new ts_dingtalk_robot_1.Markdown();
                            markdown.setTitle(this.getNodeParameter('title', i));
                            markdown.add(this.getNodeParameter('textContent', i));
                            message = markdown;
                            break;
                        case 'actionCard':
                            const actionCard = new ts_dingtalk_robot_1.ActionCard();
                            actionCard.setTitle(this.getNodeParameter('title', i));
                            actionCard.setText(this.getNodeParameter('textContent', i));
                            actionCard.setBtnOrientation(parseInt(this.getNodeParameter('buttonOrientation', i)));
                            const actions = this.getNodeParameter('actions.action', i);
                            actionCard.setBtns(actions);
                            message = actionCard;
                            break;
                        default:
                            throw new Error(`Unsupported message type: ${messageType}`);
                    }
                    item.json['dingbotMessage'] = message.get();
                    return message;
                });
                const accessToken = this.getNodeParameter('accessToken', 0);
                let secret = this.getNodeParameter('secret', 0);
                const dingbotClient = new ts_dingtalk_robot_1.Robot({
                    accessToken,
                    secret: secret ? secret : undefined,
                });
                yield Promise.all(messages.map((message) => {
                    return dingbotClient.send(message);
                }));
            }
            return this.prepareOutputData(items);
        });
    }
}
exports.DingbotSendMessageNode = DingbotSendMessageNode;