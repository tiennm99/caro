package org.nico.ratel.landlords.client.event;

import io.netty.channel.Channel;
import org.nico.noson.Noson;
import org.nico.ratel.landlords.client.entity.User;
import org.nico.ratel.landlords.enums.ClientEventCode;
import org.nico.ratel.landlords.enums.ServerEventCode;
import org.nico.ratel.landlords.helper.MapHelper;
import org.nico.ratel.landlords.print.SimplePrinter;
import org.nico.ratel.landlords.print.SimpleWriter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public class ClientEventListener_CODE_GAME_WATCH_SUCCESSFUL extends ClientEventListener {

    private static final String WATCH_SUCCESSFUL_TIPS = "                                                 \n" +
                                                        "+------------------------------------------------\n" +
                                                        "|You are already watching the game.      \n"         +
                                                        "|Room owner: %s. Room current status: %s.\n"         +
                                                        "+------------------------------------------------\n" +
                                                        "(Hint: enter [exit|e] to exit.)                  \n" +
                                                        "                                                   ";

    @Override
    public void call(Channel channel, String data) {
        // Set watching state
        User.INSTANCE.setWatching(true);

        Map<String, Object> map = MapHelper.parser(data);
        SimplePrinter.printNotice(String.format(WATCH_SUCCESSFUL_TIPS, map.get("owner"), map.get("status")));

        // Listen for exit command
        new Thread(() -> registerExitEvent(channel), "exit-spectator-input-thread").start();
    }

    private void registerExitEvent(Channel channel) {
        String enter = SimpleWriter.write();
        if ("exit".equalsIgnoreCase(enter) || "e".equalsIgnoreCase(enter)) {
            quitWatch(channel);
            return;
        }

        printCommandUsage();
        registerExitEvent(channel);
    }

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private void quitWatch(Channel channel) {
        SimplePrinter.printNotice(FORMATTER.format(LocalDateTime.now()) + "  Spectating ended. Bye.");
        SimplePrinter.printNotice("");
        SimplePrinter.printNotice("");

        User.INSTANCE.setWatching(false);
        pushToServer(channel, ServerEventCode.CODE_GAME_WATCH_EXIT);
        get(ClientEventCode.CODE_SHOW_OPTIONS).call(channel, "");
    }

    private void printCommandUsage() {
        SimplePrinter.printNotice("Enter [exit|e] to exit");
    }
}
